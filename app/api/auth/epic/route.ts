import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.EPIC_CLIENT_ID;
  const redirectUri = process.env.EPIC_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error: "Epic Games authentication is not configured.",
      },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
  });

  const epicAuthorizationUrl =
    `https://api.epicgames.dev/epic/oauth/v2/authorize?${params.toString()}`;

  return NextResponse.redirect(epicAuthorizationUrl);
}
