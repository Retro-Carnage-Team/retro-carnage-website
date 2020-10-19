export class Backend {
  private readonly backendUrl = "https://backend.retro-carnage.net";
  private gameId: string | null;

  constructor() {
    this.gameId = null;
  }

  public startGameSession() {
    const _this = this;
    fetch(`${this.backendUrl}/usage/start-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (_this.gameId = data.gameId))
      .catch((error) =>
        console.error("Failed to notify server about start", error)
      );
  }

  public reportGameState(screenName: string) {
    if (null !== this.gameId) {
      fetch(
        `${this.backendUrl}/usage/${this.gameId}/next-screen/${screenName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((error) =>
        console.error("Failed to notify server about game progress", error)
      );
    }
  }

  public reportError(error: ErrorEvent) {
    error.preventDefault();

    const data = JSON.stringify({
      message: error.message,
      source: error.filename,
      lineno: error.lineno,
      colno: error.colno,
      stack: error.error?.toString(),
    });

    console.error(`Oh no! Sorry, that shouldn't have happened: ${data}`);

    fetch(`${this.backendUrl}/script-errors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then(() => console.log("Error has been reported"))
      .catch((error) => console.error("Failed to report the error:", error));
  }
}

const BACKEND = new Backend();
export default BACKEND;
