import ServiceCardHero1 from "../../assets/img/educational/service-card-hero-1.svg";
import ServiceCardHero2 from "../../assets/img/educational/service-card-hero-2.svg";
import ServiceCardHero3 from "../../assets/img/educational/service-card-hero-3.svg";
import "./ActivationComplete.css";
import EducationalCard from "../components/EducationalCard/EducationalCard";
import { useTranslation } from "react-i18next";

function ActivationComplete() {
  const { t } = useTranslation(); 

  return (
    <div className="activation-line-status-container">
      <div className="activation-line-header">
        <div className="activation-line-header-main-text">
          {t('activation_complete.header')}
        </div>
      </div>
      <div className="activation-line-content">
        <div className="activation-line-status-container">
          <div className="activation-line-title">
            {t('activation_complete.title')}
          </div>
          <div className="activation-text">
            {t('activation_complete.activation_text')}
          </div>
        </div>
        <div className="activation-line-video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/-t-t0Auqiag"
            frameBorder="0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <hr className="activation-divider" />
      <div className="activation-line-content">
        <div className="activation-line-tools-container">
          <div className="activation-line-title">
            {t('activation_complete.activation_line_title')}
          </div>
          <div className="activation-cards-container">
            <EducationalCard title={t('activation_complete.educational_card_1_title')} text={t('activation_complete.educational_card_1_text')} imgSrc={ServiceCardHero1}/>
            <EducationalCard title={t('activation_complete.educational_card_2_title')} text={t('activation_complete.educational_card_2_text')} imgSrc={ServiceCardHero2}/>
            <EducationalCard title={t('activation_complete.educational_card_3_title')} text={t('activation_complete.educational_card_3_text')} imgSrc={ServiceCardHero3}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivationComplete;
