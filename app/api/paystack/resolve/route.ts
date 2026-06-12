import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountNumber, bankCode } = body;

    console.log("Verification request:", { accountNumber, bankCode });

    if (!accountNumber || !bankCode) {
      return NextResponse.json(
        { message: "Account number and bank code are required.", account_name: null },
        { status: 400 }
      );
    }

    const digits = accountNumber.replace(/\D/g, "");
    if (digits.length !== 10) {
      return NextResponse.json(
        { message: "Account number must be exactly 10 digits.", account_name: null },
        { status: 400 }
      );
    }

    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
    
    if (!PAYSTACK_SECRET) {
      console.error("PAYSTACK_SECRET_KEY not found");
      return NextResponse.json(
        { message: "Payment configuration error.", account_name: null },
        { status: 500 }
      );
    }

    // List of supported banks for verification
    const supportedBanks = ["044", "011", "058", "033", "057", "089", "035", "039", "082", "076", "232", "214", "032", "023", "050", "068", "069", "215", "301", "101"];
    
    if (!supportedBanks.includes(bankCode)) {
      return NextResponse.json(
        { message: "This bank does not support automatic verification. Please enter account name manually or select a different bank.", account_name: null },
        { status: 400 }
      );
    }

    // Call Paystack API
    const url = `https://api.paystack.co/bank/resolve?account_number=${digits}&bank_code=${bankCode}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Paystack response:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.status) {
      let errorMessage = data.message || "Could not verify account";
      
      if (errorMessage.includes("Invalid account number")) {
        errorMessage = "Invalid account number. For testing, use 0000000000 for Access Bank or 0123456789 for GTBank.";
      } else if (errorMessage.includes("Couldn't find")) {
        errorMessage = "Account not found. Please check the account number.";
      }
      
      return NextResponse.json(
        { message: errorMessage, account_name: null },
        { status: 400 }
      );
    }

    // Success
    return NextResponse.json({
      account_name: data.data.account_name,
      account_number: data.data.account_number,
      bank_name: data.data.bank_name || getBankName(bankCode),
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        message: error instanceof Error ? error.message : "Server error", 
        account_name: null 
      },
      { status: 500 }
    );
  }
}

function getBankName(code: string): string {
  const banks: Record<string, string> = {
    "044": "Access Bank",
    "011": "First Bank",
    "058": "GTBank",
    "033": "UBA",
    "057": "Zenith Bank",
    "089": "Fidelity Bank",
    "035": "Wema Bank",
    "039": "Stanbic IBTC",
    "082": "Keystone Bank",
    "076": "Polaris Bank",
    "232": "Sterling Bank",
    "214": "FCMB",
  };
  return banks[code] || "Unknown Bank";
}