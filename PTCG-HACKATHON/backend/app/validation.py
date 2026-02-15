import pandas as pd
import numpy as np

def validate_and_clean(df):

    # --------------------------
    # 1️⃣ Required Columns
    # --------------------------
    # Normalize column names: lowercase and replace underscores with spaces
    df.columns = [col.lower().replace("_", " ").strip() for col in df.columns]

    required_columns = [
        "ticket id",
        "description",
        "priority",
        "affected_users",
        "support_level",
        "source"
    ]

    for col in required_columns:
        if col not in df.columns:
            # Provide more helpful error showing actual columns found
            found_cols = ", ".join(df.columns)
            raise ValueError(f"Missing required column: '{col}'. Found: [{found_cols}]")

    # --------------------------
    # 2️⃣ Clean Text Fields
    # --------------------------
    df["description"] = df["description"].astype(str).str.strip()
    df = df[df["description"] != ""]

    # --------------------------
    # 3️⃣ Normalize Priority
    # --------------------------
    df["priority"] = df["priority"].astype(str).str.lower().str.strip()

    priority_mapping = {
        "p1": "critical",
        "p2": "high",
        "p3": "medium",
        "p4": "low",
        "1": "critical",
        "2": "high",
        "3": "medium",
        "4": "low"
    }

    df["priority"] = df["priority"].replace(priority_mapping)

    allowed_priorities = {"low", "medium", "high", "critical"}

    df = df[df["priority"].isin(allowed_priorities)]

    # --------------------------
    # 4️⃣ Numeric Validation
    # --------------------------
    df["affected_users"] = pd.to_numeric(df["affected_users"], errors="coerce")
    df["affected_users"] = df["affected_users"].fillna(df["affected_users"].median())
    df["affected_users"] = df["affected_users"].clip(lower=0)

    # --------------------------
    # 5️⃣ Strip Other Fields
    # --------------------------
    df["support_level"] = df["support_level"].astype(str).str.strip()
    df["source"] = df["source"].astype(str).str.strip()
    df = df.replace([np.inf, -np.inf], None)
    df = df.where(pd.notnull(df), None)

    return df
