import React from "react";
import cn from "classnames";

import { IMPRINT_SCREEN_NAME } from "../imprint/ImprintScreen";
import { LICENSE_ATTRIBUTION_SCREEN_NAME } from "../license-attribution/LicenseAttributionScreen";
import { LOADING_SCREEN_NAME } from "../loading/LoadingScreen";

import styles from "./LandingPageScreen.module.css";

export interface LandingPageScreenProps {
  onScreenChangeRequired: (screenName: string) => void;
}

function LandingPageScreen(props: LandingPageScreenProps) {
  return (
    <div className={cn(styles.screen)}>
      <div className={cn("container", "fixed-bottom", "mb-3")}>
        <div className={cn(styles.buttons, "row")}>
          <div className="col-sm">
            <button
              type="button"
              className={cn("btn", "btn-primary", "btn-lg", styles.button)}
              onClick={() => props.onScreenChangeRequired(LOADING_SCREEN_NAME)}
            >
              Start Game
            </button>
          </div>
          <div className="col-sm">
            <a
              className={cn("btn", "btn-secondary", "btn-lg", styles.button)}
              href="http://docs.retro-carnage.net/"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              Documentation
            </a>
          </div>
          <div className="col-sm">
            <button
              type="button"
              className={cn("btn", "btn-secondary", "btn-lg", styles.button)}
              onClick={() =>
                props.onScreenChangeRequired(LICENSE_ATTRIBUTION_SCREEN_NAME)
              }
            >
              License & Attribution
            </button>
          </div>
          <div className="col-sm">
            <button
              type="button"
              className={cn("btn", "btn-secondary", "btn-lg", styles.button)}
              onClick={() => props.onScreenChangeRequired(IMPRINT_SCREEN_NAME)}
            >
              Imprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const LANDING_PAGE_SCREEN_NAME = "landing_page";
export default LandingPageScreen;
