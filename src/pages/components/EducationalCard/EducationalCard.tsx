import { useTranslation } from "react-i18next";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/svg/arrow.svg";
import './EducationalCard.css'
export type EducationalCardProps = {
  title: string,
  text: string,
  imgSrc: string,
}

function EducationalCard (props : EducationalCardProps) {
  const { t } = useTranslation(); 

  return (
    <div className="educational-card">
      <div className="educational-card-img">
        <img width="300px" alt="card-img" height="100%" src={props.imgSrc} />
      </div>
      <div className="educational-card-divider"></div>
      <div className="educational-card-summary">
        <div className="educational-card-summary-title">
          {props.title}
        </div>
        <div className="educational-card-summary-text">
          {props.text}
        </div>
        <div className="educational-card-summary-action">
          <ArrowIcon />
          {t('activation_complete.educational_card_button_text')}
        </div>
      </div>
    </div>
  );
}


export default EducationalCard