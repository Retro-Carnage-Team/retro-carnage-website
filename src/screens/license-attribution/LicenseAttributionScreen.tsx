import React from "react";
import cn from "classnames";

import { LANDING_PAGE_SCREEN_NAME } from "../landing-page/LandingPageScreen";

import styles from "./LicenseAttributionScreen.module.css";

export interface LicenseAttributionScreenProps {
  onScreenChangeRequired: (screenName: string) => void;
}

function LicenseAttributionScreen(props: LicenseAttributionScreenProps) {
  return (
    <div className={styles.licenseAttribution}>
      <h1>MIT License</h1>
      <p>Copyright (c) 2020 Thomas Werner</p>
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:{" "}
      </p>
      <p>
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>

      <h1>Attributions</h1>
      <p>
        This game is based on the work of many great artists who share their
        work with us free of charge. Some of these assets are not available for
        commercial use. The following list contains all media elements that have
        not been created by the author of the software.
      </p>

      <h2>Fonts</h2>
      <ul>
        <li>
          XXII ARMY by Lecter Johnson by doubletwo.net (
          <a
            href="https://fontsbytes.com/x/xxii-army/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://github.com/huddeldaddel/retro-carnage/blob/master/public/fonts/XXII-Dirty-Army-Eula.txt"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <h2>Images</h2>
      <h3>Faces</h3>
      <ul>
        <li>
          Man Wearing Blue Crew-neck T-shirt by&nbsp;
          <a
            href="https://www.pexels.com/@italo-melo-881954?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Italo Melo
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Photo of Girl Wearing Brown Shirt by&nbsp;
          <a
            href="https://www.pexels.com/@marcelodias?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marcelo Dias
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/photo-of-girl-wearing-brown-shirt-2104252/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man Sitting Near Purple Wall by&nbsp;
          <a
            href="https://www.pexels.com/@bharatkuiper?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bharat Kumar
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/man-sitting-near-purple-wall-2232981/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man Wearing Gray Cap and Crew-neck Top by&nbsp;
          <a
            href="https://www.pexels.com/@zway?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            mo alzway
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/angry-beard-blur-close-up-542282/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man in Black Shirt by&nbsp;
          <a
            href="https://www.pexels.com/@pixabay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/man-in-black-shirt-35065/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/creative-commons-images/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Bald Man with a Serious Facial Expression by&nbsp;
          <a
            href="https://www.pexels.com/@kevinbidwell?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Bidwell
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/bald-man-with-a-serious-facial-expression-2380794/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man Wearing Black Sunglasses and Black Beanie by&nbsp;
          <a
            href="https://www.pexels.com/@chuck?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wallace Chuck
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/man-wearing-black-sunglasses-and-black-beanie-3984958/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Close-Up Photo of Man's Face by&nbsp;
          <a
            href="https://www.pexels.com/@david-kuko-965630?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Kuko
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/close-up-photo-of-man-s-face-2743754/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man in Brown Coat and Gray Button Up Shirt by&nbsp;
          <a
            href="https://www.pexels.com/@olly?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrea Piacquadio
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/man-in-brown-coat-and-gray-button-up-shirt-3785074/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Grayscale Photography of Man Wearing Polo Shirt by&nbsp;
          <a
            href="https://www.pexels.com/@deathless?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Immortal shots
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/adult-aged-black-and-white-close-up-1146603/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Portrait Photography of Man by&nbsp;
          <a
            href="https://www.pexels.com/@mrweird0?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shubh Lingwal
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/adult-aged-beard-elder-1154059/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Woman Wearing Black Long Sleeved Shirt by&nbsp;
          <a
            href="https://www.pexels.com/@flavio-augusto-918711?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flávio Augusto
          </a>
          &nbsp;from&nbsp;
          <a
            href="https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels
          </a>
          &nbsp;(
          <a
            href="https://www.pexels.com/photo/woman-wearing-black-long-sleeved-shirt-1832959/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.pexels.com/photo-license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <h3>Weapons</h3>
      <ul>
        <li>
          HK-P7 by Betzi (
          <a
            href="https://commons.wikimedia.org/wiki/File:HK-P7.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          SIG-P210 by Rama (
          <a
            href="https://commons.wikimedia.org/wiki/File:SIG_P210_IMG_6829-30_P2_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/2.0/fr/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Uzi by Uziel Galishto (
          <a
            href="https://commons.wikimedia.org/wiki/File:Uzi_of_the_israeli_armed_forces_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          MP5K by US Air Force (
          <a
            href="https://commons.wikimedia.org/wiki/File:MP5K_Submachine_Gun_(7414624602)_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          HK-MP7 by KrisfromGermany (
          <a
            href="https://commons.wikimedia.org/wiki/File:HK_MP7_Bundeswehr_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          FAL-G1 by Kevin Murray (
          <a
            href="https://commons.wikimedia.org/wiki/File:German_FAL-G1_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          AK74 (it's actually an AK47) by Nemo5576 (
          <a
            href="https://commons.wikimedia.org/wiki/File:AK-47_type_II_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          AR10 by Le-boulanger (
          <a
            href="https://commons.wikimedia.org/wiki/File:AR10_Armalite_vue_d%27ensemble_noBG.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          G36 by DomoK, SSG VINCENT A KING, USA (
          <a
            href="https://commons.wikimedia.org/wiki/File:Gewehr_G36_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          HK416N by Dybdal (
          <a
            href="https://commons.wikimedia.org/wiki/File:HK416N.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/2.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Bar M1918 by United States Army (
          <a
            href="https://commons.wikimedia.org/wiki/File:Army_Heritage_Museum_B.A.R..png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://en.wikipedia.org/wiki/public_domain"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          HK-21-LMG by Armémuseum (The Swedish Army Museum) (
          <a
            href="https://commons.wikimedia.org/wiki/File:HK_21_LMG_Left_and_Right_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          HK-MG4 by Spike78 (
          <a
            href="https://commons.wikimedia.org/wiki/File:HK_MG4_01_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          MG42 by Phanatic (
          <a
            href="https://commons.wikimedia.org/wiki/File:MG42_1_noBG.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          M20-Bazooka by Heroes & Generals Fandom Gaming Community (
          <a
            href="https://heroesandgenerals.gamepedia.com/Bazooka_M9A1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Panzerfaust-44 by German Armed Forces (
          <a
            href="https://commons.wikimedia.org/wiki/File:Leichte_Panzerfaust_44_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Panzerfaust-3 by Sonaz (
          <a
            href="https://commons.wikimedia.org/wiki/File:Panzerfaust3_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Flammenwerfer-42 by Figugegl (
          <a
            href="https://commons.wikimedia.org/wiki/File:Flammenwerfer_42_55_W%2BF.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          DM41 by Manniman2 (
          <a
            href="https://commons.wikimedia.org/wiki/File:DM41_4_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          M24 by unknown Wikimedia user (
          <a
            href="https://commons.wikimedia.org/wiki/File:M24_1_noBG.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          All ammo pictures are based on a photo taken by Grasyl (
          <a
            href="https://commons.wikimedia.org/wiki/File:Big_caliber_cartridge_comparison_v3_-_.22lr,_9x18mm,_9x19mm,_7.62x25mm,_.40_S%26W,_10mm_Auto,_.45_ACP,_.454_Casull,_.30_Carbine,_4.6mm_HK,_5.56x45mm_NATO,_5.45x39mm,_7.62x39mm,_7.62x51mm,_7.62x45mmR,_.303,_7.92x57mm,_.30-06.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Tellermine 43 MN 2007 by SEWilco (
          <a
            href="https://de.wikipedia.org/wiki/Tellermine_43#/media/Datei:Tellermine_43_MN_2007.JPG"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          RPG 7 detached noBG by Michal Maňas (
          <a
            href="https://commons.wikimedia.org/wiki/File:RPG_7_detached_noBG.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/2.5/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <h3>Other</h3>
      <ul>
        <li>
          A Winkel Tripel projection of a Visible Earth by&nbsp;
          <a
            href="https://www.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NASA
          </a>
          &nbsp;(
          <a
            href="https://commons.wikimedia.org/wiki/File:Winkel-tripel-projection.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://en.wikipedia.org/wiki/public_domain"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Black scratched metal plate by wildtextures.com (
          <a
            href="https://www.wildtextures.com/free-textures/black-scratched-metal-plate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , no license specified)
        </li>
        <li>
          check_circle_outline-24px by Google (
          <a
            href="https://material.io/resources/icons/?icon=check_circle_outline&style=baseline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.apache.org/licenses/LICENSE-2.0.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          explosion-7 by BenHickling (
          <a
            href="https://opengameart.org/content/explosion-7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          gamepad-24px by Google (
          <a
            href="https://material.io/resources/icons/?icon=gamepad&style=baseline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.apache.org/licenses/LICENSE-2.0.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          keyboard-24px by Google (
          <a
            href="https://material.io/resources/icons/?icon=keyboard&style=baseline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://www.apache.org/licenses/LICENSE-2.0.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Gunung Palung Jungle by Tom from Netherlands (
          <a
            href="https://en.wikipedia.org/wiki/File:Gunung_Palung_Jungle.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/2.0/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          The Flash Logo by Claybrooks (
          <a
            href="https://www.cleanpng.com/png-muzzle-flash-desktop-wallpaper-portable-network-gr-7014651/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Red Background by Ratani (
          <a
            href="https://www.cleanpng.com/png-encapsulated-postscript-2080422/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Camera Cartoon by Dewole (
          <a
            href="https://www.cleanpng.com/png-muzzle-flash-clip-art-the-flash-2406834/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Background Orange by Adoffice (
          <a
            href="https://www.cleanpng.com/png-muzzle-flash-gunshot-clip-art-arvores-3379867/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Graphic Background by Inorka (
          <a
            href="https://www.cleanpng.com/png-muzzle-flash-clip-art-4336582/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Brown Camouflage Pattern 11 by&nbsp;
          <a
            href="http://background-tiles.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://background-tiles.com
          </a>
          &nbsp;(
          <a
            href="https://background-tiles.com/overview/yellow/1011.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://background-tiles.com/terms.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Camouflage Pattern 21 by&nbsp;
          <a
            href="http://background-tiles.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://background-tiles.com
          </a>
          &nbsp;(
          <a
            href="https://background-tiles.com/overview/mixed-colors/1021.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://background-tiles.com/terms.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Crosshair-9-svg by&nbsp;
          <a
            href="https://iconmonstr.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            iconmonstr.com
          </a>
          &nbsp;(
          <a
            href="https://iconmonstr.com/crosshair-9-svg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://iconmonstr.com/license/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Location marker by Loading.IO (
          <a
            href="https://loading.io/spinner/dual-ring/-disqus-ring-donut-rotate"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://loading.io/license/#free-license"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Blood Puddle (
          <a
            href="https://www.nicepng.com/ourpic/u2q8t4i1q8i1o0y3_blood-pool-transparent-png-clip-art-freeuse-download/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          , Free for Personal Use)
        </li>
        <li>
          Amiga 500 by Bill Bertram (
          <a
            href="https://commons.wikimedia.org/wiki/File:Leander_Amiga500.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/2.5/deed.en"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <h2>Music</h2>

      <ul>
        <li>
          Missing You by Thee Chain Links (
          <a
            href="https://soundcloud.com/beardmont/missing-you"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          All We Ever See by Thee Chain Links (
          <a
            href="https://soundcloud.com/beardmont/all-we-ever-see-of-stars"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          The Only Me is Me by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/the-only-me-is-me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Raging Streets by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/raging-streets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Die Historic by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/die-historic"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Gaining Traction by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/gaining-traction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Hot Nights In Los Angeles by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/hot-nights-in-los-angeles"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Drive Fast by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/three-chain-links-the-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          It Can't Be Bargained With by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/three-chain-links-the-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Cracked Streets And Broken Windows by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/three-chain-links-the-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Dance Harder by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/three-chain-links-the"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Heavy Traffic by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/three-chain-links-the-happiest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Beatdown City by Three Chain Links (
          <a
            href="https://soundcloud.com/beardmont/beatdown-city"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <h2>Sounds</h2>
      <ul>
        <li>
          Cash register by kiddpark (
          <a
            href="https://freesound.org/people/kiddpark/sounds/201159/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Error by lluiset7 (
          <a
            href="https://freesound.org/people/lluiset7/sounds/141334/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Auto Assault Rifle/Gun Burst by EFlexMusic (
          <a
            href="https://freesound.org/people/EFlexMusic/sounds/393671/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-nc/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Warrior Death Cry - British Male by theuncertainman (
          <a
            href="https://freesound.org/people/theuncertainman/sounds/417539/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Male Being Impaled/Beaten AC by oldedgar (
          <a
            href="https://freesound.org/people/oldedgar/sounds/131710/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Man die by thestigmata (
          <a
            href="https://freesound.org/people/thestigmata/sounds/202037/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="http://creativecommons.org/licenses/by-nc/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
        <li>
          Q009's weapon sounds by Q009 (
          <a
            href="https://opengameart.org/content/q009s-weapon-sounds"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          ,&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
          )
        </li>
      </ul>

      <button
        type="button"
        className={cn("btn", "btn-primary", "btn-lg", styles.button)}
        onClick={() => props.onScreenChangeRequired(LANDING_PAGE_SCREEN_NAME)}
      >
        Back
      </button>
    </div>
  );
}

export const LICENSE_ATTRIBUTION_SCREEN_NAME = "license-attribution";
export default LicenseAttributionScreen;
