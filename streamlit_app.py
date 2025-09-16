
# ================== Executive Partners Defaults ==================
import streamlit as st
from pathlib import Path

# ---- Global page config ----
st.set_page_config(
    page_title="Executive Partners – Business Plan Simulator",
    page_icon="💼",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---- Load custom EP CSS ----
def load_ep_css():
    css_path = Path("styles/ep.css")
    if css_path.exists():
        st.markdown(f"<style>{css_path.read_text()}</style>", unsafe_allow_html=True)

load_ep_css()

# ---- Hero Header ----
st.markdown("""
<div class="ep-hero">
  <span class="ep-pill">Business Plan Simulator</span>
  <h1>Model portability, fees & revenue growth</h1>
  <p class="ep-sub">Enter your book metrics and instantly see portability, DPM penetration, FX/credit uplift, and revenue trajectories — in a format hiring managers love.</p>
</div>
""", unsafe_allow_html=True)

