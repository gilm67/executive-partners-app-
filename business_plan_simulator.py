# business_plan_simulator.py
# --- Executive Partners • Business Plan Simulator (styled, robust) ---

import os
import json
import warnings
from datetime import datetime
from pathlib import Path

import streamlit as st
import pandas as pd

# ---------------- App shell (safe) ----------------
st.set_page_config(
    page_title="Executive Partners – BP Simulator",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Quiet the LibreSSL warning (optional)
try:
    from urllib3.exceptions import NotOpenSSLWarning
    warnings.filterwarnings("ignore", category=NotOpenSSLWarning)
except Exception:
    pass

# Hard-disable GOOGLE creds from env (we use a local file)
import os as _os
_os.environ.pop("GOOGLE_APPLICATION_CREDENTIALS_JSON", None)
_os.environ.pop("GOOGLE_APPLICATION_CREDENTIALS", None)

# Load Streamlit skin (non-destructive). If styles/ep.css exists, inject it.
_css_path = Path("styles/ep.css")
if _css_path.exists():
    try:
        css = _css_path.read_text(encoding="utf-8")
        st.markdown(f"<style>{css}</style>", unsafe_allow_html=True)
    except Exception:
        pass

# ---------------- Third-party (optional) ----------------
try:
    import gspread
except Exception:
    st.warning("gspread not installed. Run: `pip install --upgrade gspread google-auth`")
    gspread = None

# ---------------- Config ----------------
SHEET_ID = "1A__yEhD_0LYQwBF45wTSbWqdkRe0HAdnnBSj70qgpic"
WORKSHEET_NAME = "BP_Entries"

HEADER_ORDER = [
    "Timestamp","Candidate Name","Candidate Email","Current Role","Candidate Location",
    "Current Employer","Current Market","Currency","Base Salary","Last Bonus",
    "Current Number of Clients","Current AUM (M CHF)",
    "NNM Year 1 (M CHF)","NNM Year 2 (M CHF)","NNM Year 3 (M CHF)",
    "Revenue Year 1 (CHF)","Revenue Year 2 (CHF)","Revenue Year 3 (CHF)",
    "Total Revenue 3Y (CHF)","Profit Margin (%)","Total Profit 3Y (CHF)",
    "Score","AI Evaluation Notes"
]

SA_EMAIL = None
SA_SOURCE = ""


# ---------------- Helpers ----------------
def _service_account_path() -> Path:
    return Path(__file__).parent / "service_account.json"


def _read_sa_email_from_file(p: Path) -> str:
    try:
        info = json.loads(p.read_text(encoding="utf-8"))
        return info.get("client_email", "")
    except Exception:
        return ""


def _make_highlighter(df_len: int):
    def _highlight(row):
        # Style the TOTAL row
        return [
            "background-color: rgba(59,130,246,.18); font-weight: 700;"
            if (row.name == df_len - 1) else ""
            for _ in row
        ]
    return _highlight


# ---------------- Sheets (robust) ----------------
def connect_sheet():
    """
    Returns: (worksheet or None, human_message)
    Never raises to the top-level. Shows hints instead.
    """
    global SA_EMAIL, SA_SOURCE
    if gspread is None:
        return None, "gspread not available."

    try:
        sa_path = _service_account_path()
        if not sa_path.exists():
            return None, (
                "⚠️ service_account.json not found next to this script.\n"
                f"Place the file at: {sa_path}"
            )

        SA_SOURCE = f"local-file:{sa_path}"
        SA_EMAIL = _read_sa_email_from_file(sa_path)

        gc = gspread.service_account(filename=str(sa_path))

        try:
            sh = gc.open_by_key(SHEET_ID)
        except Exception as e:
            msg = str(e)
            if "PERMISSION_DENIED" in msg or "403" in msg:
                hint = (f"Permission denied. Share the Google Sheet with "
                        f"{SA_EMAIL or '[service account email]'} as Editor.")
                return None, f"⚠️ Could not connect to Google Sheet: {hint}"
            if "NOT_FOUND" in msg or "404" in msg:
                return None, "⚠️ Could not connect: Sheet not found. Check SHEET_ID."
            return None, f"⚠️ Google API error while opening sheet: {e}"

        try:
            ws = sh.worksheet(WORKSHEET_NAME)
        except gspread.exceptions.WorksheetNotFound:
            ws = sh.add_worksheet(title=WORKSHEET_NAME, rows=2000, cols=50)

        headers = ws.row_values(1)
        if headers != HEADER_ORDER:
            ws.update("A1", [HEADER_ORDER])

        return ws, "✅ Connected to Google Sheet"
    except Exception as e:
        # Do NOT kill the app — just report nicely
        return None, f"⚠️ Could not connect to Google Sheet: {e}"


def append_in_header_order(ws, data_dict: dict):
    headers = ws.row_values(1) or HEADER_ORDER
    row = [data_dict.get(h, "") for h in headers]
    ws.append_row(row, value_input_option="USER_ENTERED")


def clean_trailing_columns(ws, first_bad_letter="X"):
    ws.batch_clear([f"{first_bad_letter}2:ZZ"])
    ws.resize(cols=len(HEADER_ORDER))


# ---------------- Top band (hero + diagnostics) ----------------
worksheet, sheet_status = connect_sheet()

st.markdown(
    """
    <div class="ep-hero">
      <h1>Business Plan Simulator</h1>
      <p class="ep-sub">
        Model NNM, revenue and net margin, then save a clean entry for your internal pipeline.
        Data is confidential and stored securely.
      </p>
    </div>
    """,
    unsafe_allow_html=True,
)

# Subtle diagnostics (kept, but compact)
with st.expander("🔎 Connection diagnostics"):
    st.caption(f"Running file: {os.path.abspath(__file__)}")
    st.caption(
        "ENV — GAC: "
        f"{'set' if os.getenv('GOOGLE_APPLICATION_CREDENTIALS') else 'unset'} | "
        "GAC_JSON: "
        f"{'set' if os.getenv('GOOGLE_APPLICATION_CREDENTIALS_JSON') else 'unset'}"
    )
    st.caption(sheet_status)
    st.caption(f"Cred source (forced local): {SA_SOURCE or 'unknown'}")
    st.caption(f"Service account email: `{SA_EMAIL or 'n/a'}`")

st.info("*Fields marked with an asterisk (*) are mandatory and handled confidentially.")


# ---------------- Main UI (guarded) ----------------
try:
    # ---------- SECTION 1 ----------
    st.markdown("---")
    st.markdown("### 1️⃣ Basic Candidate Information")
    st.markdown(
        '<div class="ep-card">',
        unsafe_allow_html=True,
    )
    st.caption("Please complete all required fields (*) before proceeding.")

    col1, col2 = st.columns(2)
    with col1:
        candidate_name = st.text_input("Candidate Name")
        candidate_email = st.text_input("Candidate Email *")
        years_experience = st.number_input("Years of Experience *", min_value=0, step=1)
        inherited_book = st.slider("Inherited Book (% of total AUM) *", 0, 100, 0, 1)
        current_role = st.selectbox(
            "Current Role *",
            [
                "Relationship Manager","Senior Relationship Manager","Assistant Relationship Manager",
                "Investment Advisor","Managing Director","Director","Team Head","Market Head","Other",
            ],
        )
        candidate_location = st.selectbox(
            "Candidate Location *",
            [
                "— Select —","Zurich","Geneva","Lausanne","Basel","Luzern",
                "Dubai","London","Hong Kong","Singapore","New York","Miami","Madrid","Lisbon","Sao Paulo",
            ],
        )
    with col2:
        current_employer = st.text_input("Current Employer *")
        current_market = st.selectbox(
            "Current Market *",
            [
                "CH Onshore","UK","Portugal","Spain","Germany","MEA","LATAM",
                "CIS","CEE","France","Benelux","Asia","Argentina","Brazil","Conosur","NRI","India","US","China",
            ],
        )
        currency = st.selectbox("Currency *", ["CHF","USD","EUR","AED","SGD","HKD"])
        base_salary = st.number_input(f"Current Base Salary ({currency}) *", min_value=0, step=1000)
        last_bonus = st.number_input(f"Last Bonus ({currency}) *", min_value=0, step=1000)
        current_number_clients = st.number_input("Current Number of Clients *", min_value=0)
        current_assets = st.number_input("Current Assets Under Management (in million CHF) *", min_value=0.0, step=0.1)
    st.markdown("</div>", unsafe_allow_html=True)

    # ---------- SECTION 2 ----------
    st.markdown("---")
    st.markdown("### 2️⃣ Net New Money Projection over 3 years")
    st.markdown('<div class="ep-card">', unsafe_allow_html=True)
    st.caption("Please complete all fields in this section for accurate projections.")

    c1, c2, c3 = st.columns(3)
    with c1:
        nnm_y1 = st.number_input("NNM Year 1 (in M CHF)", min_value=0.0, step=0.1)
    with c2:
        nnm_y2 = st.number_input("NNM Year 2 (in M CHF)", min_value=0.0, step=0.1)
    with c3:
        nnm_y3 = st.number_input("NNM Year 3 (in M CHF)", min_value=0.0, step=0.1)

    d1, d2, d3 = st.columns(3)
    with d1:
        proj_clients_y1 = st.number_input("Projected Clients Year 1", min_value=0)
    with d2:
        proj_clients_y2 = st.number_input("Projected Clients Year 2", min_value=0)
    with d3:
        proj_clients_y3 = st.number_input("Projected Clients Year 3", min_value=0)
    st.markdown("</div>", unsafe_allow_html=True)

    # ---------- SECTION 3 ----------
    st.markdown("---")
    st.markdown("### 3️⃣ Enhanced NNA / Prospects Table")
    st.markdown('<div class="ep-card">', unsafe_allow_html=True)
    st.caption("Add prospects below. Use ✏️ Edit to modify a row, or 🗑 Delete to remove it.")

    if "prospects_list" not in st.session_state:
        st.session_state.prospects_list = []
    if "edit_index" not in st.session_state:
        st.session_state.edit_index = -1

    for key, default in [
        ("p_name", ""),
        ("p_source", "Self Acquired"),
        ("p_wealth", 0.0),
        ("p_best", 0.0),
        ("p_worst", 0.0),
    ]:
        if key not in st.session_state:
            st.session_state[key] = default

    with st.expander("📥 Import prospects from CSV (Name, Source, Wealth (M), Best NNM (M), Worst NNM (M))"):
        up = st.file_uploader("Upload CSV", type=["csv"])
        if up is not None:
            try:
                df_up = pd.read_csv(up)
                df_up = df_up.rename(columns=lambda x: x.strip())
                needed = ["Name","Source","Wealth (M)","Best NNM (M)","Worst NNM (M)"]
                if not all(c in df_up.columns for c in needed):
                    st.error("CSV missing one of the required columns.")
                else:
                    for c in ["Wealth (M)","Best NNM (M)","Worst NNM (M)"]:
                        df_up[c] = pd.to_numeric(df_up[c], errors="coerce").fillna(0.0)
                    st.session_state.prospects_list += df_up[needed].to_dict(orient="records")
                    st.success(f"Imported {len(df_up)} prospects.")
            except Exception as e:
                st.exception(e)

    f1, f2, f3, f4, f5 = st.columns([2,2,2,2,2])
    with f1:
        st.session_state.p_name = (
            st.text_input("Name", value=st.session_state.p_name, key="p_name_input")
            or st.session_state.p_name
        )
        st.session_state.p_name = st.session_state.p_name_input
    with f2:
        options = ["Self Acquired","Inherited","Finder"]
        st.session_state.p_source = st.selectbox(
            "Source",
            options,
            index=options.index(st.session_state.p_source) if st.session_state.p_source in options else 0,
            key="p_source_input"
        )
        st.session_state.p_source = st.session_state.p_source_input
    with f3:
        st.session_state.p_wealth = st.number_input(
            "Wealth (M)", min_value=0.0, step=0.1, value=float(st.session_state.p_wealth), key="p_wealth_input"
        )
    with f4:
        st.session_state.p_best = st.number_input(
            "Best NNM (M)", min_value=0.0, step=0.1, value=float(st.session_state.p_best), key="p_best_input"
        )
    with f5:
        st.session_state.p_worst = st.number_input(
            "Worst NNM (M)", min_value=0.0, step=0.1, value=float(st.session_state.p_worst), key="p_worst_input"
        )

    def _validate_row(name, source, wealth, best, worst):
        errs = []
        if not name or not name.strip():
            errs.append("Name is required.")
        if source not in ["Self Acquired","Inherited","Finder"]:
            errs.append("Source must be Self Acquired / Inherited / Finder.")
        for label, val in [("Wealth (M)", wealth), ("Best NNM (M)", best), ("Worst NNM (M)", worst)]:
            try:
                x = float(val)
                if x < 0:
                    errs.append(f"{label} must be ≥ 0.")
            except Exception:
                errs.append(f"{label} must be a number.")
        return errs

    def _reset_form():
        st.session_state.p_name = ""
        st.session_state.p_source = "Self Acquired"
        st.session_state.p_wealth = 0.0
        st.session_state.p_best = 0.0
        st.session_state.p_worst = 0.0

    c_add, c_update, c_cancel = st.columns([1,1,1])
    add_clicked = c_add.button("➕ Add", disabled=(st.session_state.edit_index != -1), type="primary")
    update_clicked = c_update.button("💾 Update", disabled=(st.session_state.edit_index == -1))
    cancel_clicked = c_cancel.button("✖ Cancel Edit", disabled=(st.session_state.edit_index == -1))

    if add_clicked:
        errs = _validate_row(
            st.session_state.p_name, st.session_state.p_source,
            st.session_state.p_wealth, st.session_state.p_best, st.session_state.p_worst
        )
        if errs:
            st.error("\n".join(f"• {e}" for e in errs))
        else:
            st.session_state.prospects_list.append(
                {
                    "Name": st.session_state.p_name.strip(),
                    "Source": st.session_state.p_source,
                    "Wealth (M)": float(st.session_state.p_wealth),
                    "Best NNM (M)": float(st.session_state.p_best),
                    "Worst NNM (M)": float(st.session_state.p_worst),
                }
            )
            _reset_form()
            st.success("Prospect added.")

    if update_clicked:
        idx = st.session_state.edit_index
        errs = _validate_row(
            st.session_state.p_name, st.session_state.p_source,
            st.session_state.p_wealth, st.session_state.p_best, st.session_state.p_worst
        )
        if errs:
            st.error("\n".join(f"• {e}" for e in errs))
        else:
            st.session_state.prospects_list[idx] = {
                "Name": st.session_state.p_name.strip(),
                "Source": st.session_state.p_source,
                "Wealth (M)": float(st.session_state.p_wealth),
                "Best NNM (M)": float(st.session_state.p_best),
                "Worst NNM (M)": float(st.session_state.p_worst),
            }
            st.session_state.edit_index = -1
            _reset_form()
            st.success("Prospect updated.")

    if cancel_clicked:
        st.session_state.edit_index = -1
        _reset_form()
        st.info("Edit cancelled.")

    df_pros = pd.DataFrame(
        st.session_state.prospects_list,
        columns=["Name","Source","Wealth (M)","Best NNM (M)","Worst NNM (M)"]
    )

    # Pretty list rows
    if not df_pros.empty:
        st.write(" ")
        for i, row in df_pros.iterrows():
            colA, colB, colC, colD, colE, colF = st.columns([2,2,2,2,1,1])
            colA.write(row["Name"])
            colB.write(row["Source"])
            colC.write(f"{row['Wealth (M)']:,.1f}")
            colD.write(f"{row['Best NNM (M)']:,.1f} / {row['Worst NNM (M)']:,.1f}")

            if colE.button("✏️ Edit", key=f"edit_{i}"):
                st.session_state.edit_index = i
                st.session_state.p_name = row["Name"]
                st.session_state.p_source = row["Source"] if row["Source"] in ["Self Acquired","Inherited","Finder"] else "Self Acquired"
                st.session_state.p_wealth = float(row["Wealth (M)"] or 0.0)
                st.session_state.p_best = float(row["Best NNM (M)"] or 0.0)
                st.session_state.p_worst = float(row["Worst NNM (M)"] or 0.0)
                st.rerun()

            if colF.button("🗑 Delete", key=f"del_{i}"):
                del st.session_state.prospects_list[i]
                st.rerun()

    # Typed DF + TOTAL row
    cols = ["Name", "Source", "Wealth (M)", "Best NNM (M)", "Worst NNM (M)"]
    if df_pros.empty:
        df_pros = pd.DataFrame(columns=cols).astype({
            "Name": "string","Source": "string",
            "Wealth (M)": "float64","Best NNM (M)": "float64","Worst NNM (M)": "float64",
        })
    else:
        df_pros = df_pros.astype({
            "Name": "string","Source": "string",
            "Wealth (M)": "float64","Best NNM (M)": "float64","Worst NNM (M)": "float64",
        }, errors="ignore")

    total_row = pd.DataFrame(
        [{
            "Name": "TOTAL","Source": "",
            "Wealth (M)": float(df_pros["Wealth (M)"].sum()) if not df_pros.empty else 0.0,
            "Best NNM (M)": float(df_pros["Best NNM (M)"].sum()) if not df_pros.empty else 0.0,
            "Worst NNM (M)": float(df_pros["Worst NNM (M)"].sum()) if not df_pros.empty else 0.0,
        }],
        columns=cols
    ).astype(df_pros.dtypes.to_dict(), errors="ignore")

    frames = [df for df in (df_pros, total_row) if not df.empty]
    df_display = pd.concat(frames, ignore_index=True) if frames else total_row.copy()

    highlighter = _make_highlighter(len(df_display))
    st.dataframe(df_display.style.apply(highlighter, axis=1), use_container_width=True)

    best_sum = float(df_pros["Best NNM (M)"].sum()) if not df_pros.empty else 0.0
    st.caption(f"Δ Best NNM vs NNM Y1: {best_sum - float((locals().get('nnm_y1') or 0.0)):+.1f} M")
    st.markdown("</div>", unsafe_allow_html=True)

    # ---------- SECTION 4 ----------
    st.markdown("---")
    st.markdown("### 4️⃣ Revenue, Costs & Net Margin Analysis")
    st.markdown('<div class="ep-card">', unsafe_allow_html=True)
    st.caption("Ensure all inputs above are filled before analysis.")

    roa_cols = st.columns(3)
    roa_y1 = roa_cols[0].number_input("ROA % Year 1", min_value=0.0, value=1.0, step=0.1)
    roa_y2 = roa_cols[1].number_input("ROA % Year 2", min_value=0.0, value=1.0, step=0.1)
    roa_y3 = roa_cols[2].number_input("ROA % Year 3", min_value=0.0, value=1.0, step=0.1)

    rev1 = (locals().get('nnm_y1') or 0.0) * roa_y1 / 100 * 1_000_000
    rev2 = (locals().get('nnm_y2') or 0.0) * roa_y2 / 100 * 1_000_000
    rev3 = (locals().get('nnm_y3') or 0.0) * roa_y3 / 100 * 1_000_000

    fixed_cost = (locals().get('base_salary') or 0.0) * 1.25

    nm1 = rev1 - fixed_cost
    nm2 = rev2 - fixed_cost
    nm3 = rev3 - fixed_cost

    gross_total = rev1 + rev2 + rev3
    total_costs = fixed_cost * 3
    nm_total = nm1 + nm2 + nm3

    df_rev = pd.DataFrame(
        {
            "Year": ["Year 1", "Year 2", "Year 3", "Total"],
            "Gross Revenue": [rev1, rev2, rev3, gross_total],
            "Fixed Cost": [fixed_cost, fixed_cost, fixed_cost, total_costs],
            "Net Margin": [nm1, nm2, nm3, nm_total],
        }
    )
    ctable, cchart = st.columns(2)
    with ctable:
        st.table(
            df_rev.set_index("Year").style.format(
                {"Gross Revenue": "{:,.0f}", "Fixed Cost": "{:,.0f}", "Net Margin": "{:,.0f}"}
            )
        )
    with cchart:
        st.bar_chart(df_rev.set_index("Year")[["Gross Revenue", "Net Margin"]])
    st.markdown("</div>", unsafe_allow_html=True)

    # ---------- SECTION 5 ----------
    st.markdown("---")
    st.markdown("### 5️⃣ AI Candidate Analysis for Recruiter")
    st.markdown('<div class="ep-card">', unsafe_allow_html=True)

    seg_col1, seg_col2 = st.columns(2)
    with seg_col1:
        target_segment = st.selectbox("Target Segment (for thresholds)", ["HNWI", "UHNWI"], index=0)
    with seg_col2:
        tolerance_pct = st.slider("NNM vs Prospects tolerance (%)", 0, 50, 10, 1)

    total_nnm_3y = float((locals().get('nnm_y1') or 0.0) + (locals().get('nnm_y2') or 0.0) + (locals().get('nnm_y3') or 0.0))
    avg_roa = float((roa_y1 + roa_y2 + roa_y3) / 3)

    current_market = locals().get('current_market', "CH Onshore")
    current_assets = float(locals().get('current_assets') or 0.0)
    base_salary = float(locals().get('base_salary') or 0.0)
    last_bonus = float(locals().get('last_bonus') or 0.0)
    years_experience = int(locals().get('years_experience') or 0)
    current_number_clients = int(locals().get('current_number_clients') or 0)

    aum_min = 200.0 if (current_market == "CH Onshore" or target_segment == "HNWI") else 300.0

    score = 0
    reasons_pos, reasons_neg, flags = [], [], []

    if years_experience >= 7:
        score += 2; reasons_pos.append("Experience ≥7 years in market")
    elif years_experience >= 6:
        score += 1; reasons_pos.append("Experience 6 years")
    else:
        reasons_neg.append("Experience <6 years")

    if current_assets >= aum_min:
        if current_market == "CH Onshore" and current_assets >= 250:
            score += 2; reasons_pos.append("AUM meets CH 250M target")
        else:
            score += 2; reasons_pos.append(f"AUM ≥ {aum_min}M")
    else:
        reasons_neg.append(f"AUM shortfall: {aum_min - current_assets:.0f}M")

    if base_salary > 200_000 and last_bonus > 100_000:
        score += 2; reasons_pos.append("Comp indicates hunter profile")
    elif base_salary <= 150_000 and last_bonus <= 50_000:
        score -= 1; reasons_neg.append("Low comp indicates inherited/low portability")
    else:
        flags.append("Comp neutral – clarify origin of book")

    if avg_roa >= 1.0:
        score += 2; reasons_pos.append(f"Avg ROA {avg_roa:.2f}% (excellent)")
    elif avg_roa >= 0.8:
        score += 1; reasons_pos.append(f"Avg ROA {avg_roa:.2f}% (acceptable)")
    else:
        reasons_neg.append(f"Avg ROA {avg_roa:.2f}% is low")

    if current_number_clients == 0:
        flags.append("Clients not provided")
    elif current_number_clients > 80:
        reasons_neg.append(f"High client count ({current_number_clients}) – likely lower segment")
    else:
        score += 1; reasons_pos.append("Client load appropriate (≤80)")

    df_pros_check = pd.DataFrame(
        st.session_state.prospects_list,
        columns=["Name","Source","Wealth (M)","Best NNM (M)","Worst NNM (M)"]
    )
    nnm_y1_val = float((locals().get('nnm_y1') or 0.0))
    best_sum = float(df_pros_check["Best NNM (M)"].sum()) if not df_pros_check.empty else 0.0
    tol = max(0.0, tolerance_pct) / 100.0
    if nnm_y1_val == 0.0 and best_sum == 0.0:
        flags.append("Prospects & NNM Y1 both zero")
    elif abs(best_sum - nnm_y1_val) <= tol * max(nnm_y1_val, 1e-9):
        score += 1; reasons_pos.append(f"Prospects Best NNM {best_sum:.1f}M ≈ NNM Y1 {nnm_y1_val:.1f}M")
    else:
        reasons_neg.append(f"Prospects {best_sum:.1f}M vs NNM Y1 {nnm_y1_val:.1f}M (> {int(tolerance_pct)}% dev)")

    if total_nnm_3y >= (100.0 if target_segment == "HNWI" else 200.0):
        score += 2; reasons_pos.append(f"3Y NNM {total_nnm_3y:.1f}M meets target")
    else:
        reasons_neg.append(f"3Y NNM {total_nnm_3y:.1f}M below target")

    verdict = "🟢 Strong Candidate" if score >= 7 else "🟡 Medium Potential" if score >= 4 else "🔴 Weak Candidate"

    st.subheader(f"Traffic Light: {verdict} (score {score}/10)")
    colA, colB, colC = st.columns(3)
    with colA:
        st.markdown("**Positives**")
        for r in reasons_pos or ["—"]:
            st.markdown(f"- ✅ {r}")
    with colB:
        st.markdown("**Risks / Gaps**")
        for r in reasons_neg or ["—"]:
            st.markdown(f"- ❌ {r}")
    with colC:
        st.markdown("**Flags / To Clarify**")
        for r in flags or ["—"]:
            st.markdown(f"- ⚠️ {r}")

    m1, m2, m3, m4 = st.columns(4)
    with m1: st.metric("AUM (M)", f"{current_assets:,.0f}")
    with m2: st.metric("Avg ROA %", f"{avg_roa:.2f}")
    with m3: st.metric("3Y NNM (M)", f"{total_nnm_3y:.1f}")
    with m4: st.metric("Clients", f"{int(current_number_clients)}")
    st.markdown("</div>", unsafe_allow_html=True)

    # ---------- SECTION 6 ----------
    st.markdown("---")
    st.markdown("### 6️⃣ Summary & Save Entry")
    st.markdown('<div class="ep-card">', unsafe_allow_html=True)

    if st.button("Save to Google Sheet"):
        def _email_valid(e: str) -> bool:
            return isinstance(e, str) and "@" in e and "." in e.split("@")[-1]

        missing = []
        if not _email_valid(locals().get('candidate_email') or ""):
            missing.append("Candidate Email (valid)")
        if (locals().get('candidate_location') or "— Select —") == "— Select —":
            missing.append("Candidate Location")

        if missing:
            st.error("Please complete: " + ", ".join(missing))
        elif not worksheet:
            st.warning("⚠️ Google Sheet connection not available.")
        else:
            nnm_y1 = float(locals().get('nnm_y1') or 0.0)
            nnm_y2 = float(locals().get('nnm_y2') or 0.0)
            nnm_y3 = float(locals().get('nnm_y3') or 0.0)
            roa_y1 = float(locals().get('roa_y1') or 0.0)
            roa_y2 = float(locals().get('roa_y2') or 0.0)
            roa_y3 = float(locals().get('roa_y3') or 0.0)
            base_salary = float(locals().get('base_salary') or 0.0)

            total_rev_3y = ((nnm_y1 * roa_y1) + (nnm_y2 * roa_y2) + (nnm_y3 * roa_y3)) / 100 * 1_000_000
            profit_margin_pct = (((total_rev_3y - (base_salary * 1.25 * 3)) / total_rev_3y) * 100.0) if total_rev_3y > 0 else 0.0
            total_profit_3y = (
                (nnm_y1 * roa_y1 / 100 * 1_000_000) +
                (nnm_y2 * roa_y2 / 100 * 1_000_000) +
                (nnm_y3 * roa_y3 / 100 * 1_000_000)
            ) - (base_salary * 1.25 * 3)

            data_dict = {
                "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "Candidate Name": locals().get('candidate_name', ""),
                "Candidate Email": locals().get('candidate_email', ""),
                "Current Role": locals().get('current_role', ""),
                "Candidate Location": locals().get('candidate_location', ""),
                "Current Employer": locals().get('current_employer', ""),
                "Current Market": locals().get('current_market', ""),
                "Currency": locals().get('currency', ""),
                "Base Salary": base_salary,
                "Last Bonus": float(locals().get('last_bonus') or 0.0),
                "Current Number of Clients": int(locals().get('current_number_clients') or 0),
                "Current AUM (M CHF)": float(locals().get('current_assets') or 0.0),
                "NNM Year 1 (M CHF)": nnm_y1,
                "NNM Year 2 (M CHF)": nnm_y2,
                "NNM Year 3 (M CHF)": nnm_y3,
                "Revenue Year 1 (CHF)": nnm_y1 * roa_y1 / 100 * 1_000_000,
                "Revenue Year 2 (CHF)": nnm_y2 * roa_y2 / 100 * 1_000_000,
                "Revenue Year 3 (CHF)": nnm_y3 * roa_y3 / 100 * 1_000_000,
                "Total Revenue 3Y (CHF)": total_rev_3y,
                "Profit Margin (%)": profit_margin_pct,
                "Total Profit 3Y (CHF)": total_profit_3y,
                "Score": int(locals().get('score') or 0),
                "AI Evaluation Notes": locals().get('verdict', ""),
            }

            try:
                append_in_header_order(worksheet, data_dict)
                st.success("✅ Entry saved to Google Sheet in correct order")

                preview_cols = [
                    "Candidate Name","Candidate Email","Current Role","Candidate Location",
                    "Current Employer","Current Market","Currency","Base Salary","Last Bonus",
                    "Current AUM (M CHF)","NNM Year 1 (M CHF)","NNM Year 2 (M CHF)","NNM Year 3 (M CHF)",
                    "Revenue Year 1 (CHF)","Revenue Year 2 (CHF)","Revenue Year 3 (CHF)",
                    "Total Revenue 3Y (CHF)","Profit Margin (%)","Total Profit 3Y (CHF)",
                    "Score","AI Evaluation Notes"
                ]
                df_prev = pd.DataFrame([{k: data_dict.get(k, "") for k in preview_cols}])
                st.dataframe(
                    df_prev.style.format({
                        "Base Salary": "{:,.0f}",
                        "Last Bonus": "{:,.0f}",
                        "Current AUM (M CHF)": "{:,.1f}",
                        "NNM Year 1 (M CHF)": "{:,.1f}",
                        "NNM Year 2 (M CHF)": "{:,.1f}",
                        "NNM Year 3 (M CHF)": "{:,.1f}",
                        "Revenue Year 1 (CHF)": "{:,.0f}",
                        "Revenue Year 2 (CHF)": "{:,.0f}",
                        "Revenue Year 3 (CHF)": "{:,.0f}",
                        "Total Revenue 3Y (CHF)": "{:,.0f}",
                        "Profit Margin (%)": "{:,.1f}",
                        "Total Profit 3Y (CHF)": "{:,.0f}",
                    }),
                    use_container_width=True
                )
            except Exception as e:
                st.exception(e)

    st.markdown("</div>", unsafe_allow_html=True)

except Exception as e:
    st.error("An unexpected error occurred while building the UI.")
    st.exception(e)