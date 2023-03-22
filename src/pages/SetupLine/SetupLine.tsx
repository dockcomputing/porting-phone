import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './SetupLine.css'

function SetupLinePage() {

    const { t } = useTranslation(); 
    const [isSetupCompleted, setIsSetupCompleted] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=36.778259&longitude=-119.417931&current_weather=True`)
            .then((res) =>
                res.json()
                    .then(
                        (data) => {
                            setIsSetupCompleted(true)
                        }
                        ).catch(() => {
                            setIsSetupCompleted(false)
                        })
            )  
        }, 3000)
    }, [])

    const handleContinueOnClick = () => {
        if (isSetupCompleted) {
            navigate('/activation')
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className="setup-line-container">
            <div className="setup-line-header">
                <div className="setup-line-header-main-text">
                {t('setup_line.header')}
                </div>
            </div>
            <div className="setup-line-content">
                <div className="setup-line-status-container">
                    <div className="setup-line-status-title">
                        {t('setup_line.status_title')}
                    </div>
                    <div className="setup-line-status-subtitle">
                    {isSetupCompleted ? t('setup_line.status_completed') : t('setup_line.status_incomplete') }
                    </div>
                    <div className={`setup-line-continue-button ${isSetupCompleted ? '' : 'disabled'}`} onClick={handleContinueOnClick}>
                        {t('setup_line.continue_button')}
                    </div>
                </div>
                <div className="setup-line-video-container">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/-t-t0Auqiag" frameBorder="0" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}

export default SetupLinePage;

