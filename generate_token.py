#!/usr/bin/env python3
import json, os, secrets, string, sys
from datetime import datetime

def generate_token(candidate_name, institution, mandate=""):
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/assessment-tokens.json")
    tokens = json.load(open(path)) if os.path.exists(path) else {}
    token = "".join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(8))
    tokens[token] = {
        "candidateName": candidate_name,
        "institution": institution,
        "mandate": mandate,
        "createdAt": datetime.now().isoformat(),
        "used": False,
        "usedAt": None
    }
    with open(path, "w") as f:
        json.dump(tokens, f, indent=2)
    url = f"https://execpartners.ch/en/candidate-assessment/{token}"
    print(f"\n{'='*60}")
    print(f"  EP Assessment Link Generated")
    print(f"{'='*60}")
    print(f"  Candidate  : {candidate_name}")
    print(f"  Institution: {institution}")
    if mandate:
        print(f"  Mandate    : {mandate}")
    print(f"  Token      : {token}")
    print(f"  URL        : {url}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print('Usage: python3 generate_token.py "Name" "Institution" "Mandate"')
        sys.exit(1)
    generate_token(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "")
