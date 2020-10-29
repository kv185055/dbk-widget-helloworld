import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import PropTypes from 'prop-types';
import { Combobox } from '@fluid/form-elements-rw';
import 'react-clock/dist/Clock.css';
import '../scss/clock.scss';

const CURRENT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezones = [
    'America/New_York',
    'Australia/Brisbane',
    'Europe/London',
    'Asia/Kolkata',
].filter((e) => {
    return e !== CURRENT_TIMEZONE;
});
timezones.push(CURRENT_TIMEZONE);

if (process.env.NODE_ENV === 'production') {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute(
        'href',
        'https://widgets.dev.cloud.ncrsaas.com/dbk-widget-helloworld/latest/static/css/ClockWidget.css',
    );
    document.getElementsByTagName('head')[0].appendChild(link);
}

const renderTimeZone = (showTimezones, handleChange, value) => {
    if (!showTimezones) {
        return <p>{CURRENT_TIMEZONE}</p>;
    }

    const data = timezones.map((t) => {
        return {
            id: t,
            text: t.replaceAll('/', '-'),
        };
    });

    return (
        <Combobox
            placeholder="Please Select One..."
            textField="text"
            valueField="id"
            data={data}
            shouldSuggest={false}
            onChange={handleChange}
            value={value}
        />
    );
};

function ClockWidget(props) {
    const [value, setValue] = useState(new Date());
    const [timezone, setTimezone] = useState(CURRENT_TIMEZONE);

    const { showTimezones, title, titleFontSize, backgroundColor } = props;

    useEffect(() => {
        console.log('received', props);

        const interval = setInterval(() => {
            const curDate = new Date();
            const adjustedTime = curDate.toLocaleString('en-US', {
                timeZone: timezone,
            });
            setValue(new Date(adjustedTime));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timezone]);

    const handleChange = (e) => {
        setTimezone(e.id);
    };

    return (
        <div className="clock-container" style={{ backgroundColor }}>
            <p style={{ fontSize: `${titleFontSize}px` }}>{title}</p>
            {renderTimeZone(showTimezones, handleChange, timezone)}
            <Clock value={value} />
        </div>
    );
}

ClockWidget.defaultProps = {
    showTimezones: false,
    title: 'Current time',
    titleFontSize: 15,
    backgroundColor: '#FFFFFF',
};

ClockWidget.propTypes = {
    showTimezones: PropTypes.bool,
    title: PropTypes.string,
    titleFontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
};

export default ClockWidget;
