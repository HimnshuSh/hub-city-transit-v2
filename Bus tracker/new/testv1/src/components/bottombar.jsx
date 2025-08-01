import { useState } from 'react';
import ButtonComponent from './button';

import DisplaySchedule from '../model/displaySchedule';
import DisplayRoutes from '../model/displayRoutes2';
import DisplaySearch from '../model/displaySearch';
import DisplayFare from '../model/displayFare';
import DisplayLegend from '../model/displayLegend';

export default function BottomBar({ busData }) {
    const [activeButton, setActiveButton] = useState(null);

    const buttonArray = [
        { name: 'Schedule', icon: 'src/assets/icons/schedule-icon2.png', height: '30px' },
        { name: 'Routes', icon: 'src/assets/icons/route-icon.png', height: '30px' },
        { name: 'Search', icon: 'src/assets/icons/search-icon2.png', height: '30px' },
        { name: 'Fare', icon: 'src/assets/icons/fare-icon.png', height: '30px' },
        { name: 'Legend', icon: 'src/assets/icons/legend-icon.png', height: '30px' },
    ];

    function handleButtonClick(buttonName) {
        setActiveButton(prevActiveButton =>
            prevActiveButton === buttonName ? null : buttonName
        );
    }

    const renderActiveComponent = () => {
        switch (activeButton) {
            case 'Schedule':
                return <DisplaySchedule />;
            case 'Routes':
                return <DisplayRoutes busData={busData} />;
            case 'Search':
                return <DisplaySearch />;
            case 'Fare':
                return <DisplayFare />;
            case 'Legend':
                return <DisplayLegend />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='bottom-bar'>
                {buttonArray.map(type => (
                    <ButtonComponent
                        key={type.name}
                        prop={type}
                        isActive={activeButton === type.name}
                        onClick={() => handleButtonClick(type.name)}
                    />
                ))}
            </div>
            
            <div className={`function-box`}>
                {renderActiveComponent()}
            </div>
        </>
    );
}