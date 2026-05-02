"use server";

import { AnalysisResult } from "@/lib/types";

const GO_API_URL = process.env.GO_API_URL || "http://localhost:8080";

/**
 * Server Action: Analyze a market topic via the Go backend.
 * Called from the client QueryInput component.
 */
export async function analyzeMarket(
  _prevState: AnalysisResult | null,
  formData: FormData
): Promise<AnalysisResult> {
  const query = formData.get("query") as string;

  // Validate input
  if (!query || query.trim().length < 3) {
    return {
      success: false,
      error: "Please enter a market topic (at least 3 characters).",
    };
  }

  if (query.trim().length > 200) {
    return {
      success: false,
      error: "Query is too long. Please keep it under 200 characters.",
    };
  }

  try {
    const response = await fetch(`${GO_API_URL}/api/v1/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error:
          errorData?.error ||
          "Captain is temporarily unable to navigate these waters. Please try again.",
      };
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || "Failed to parse navigation data.",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      error:
        "Unable to reach the navigation server. Please check your connection and try again.",
    };
  }
}
