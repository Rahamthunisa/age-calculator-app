import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './AgeCalculator.css';

const AgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  
 
  const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };

  const getDaysInMonth = (month, year) => {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  };

  const isValidDate = (day, month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    return day > 0 && day <= daysInMonth && month > 0 && month <= 12;
  };

  const calculateAge = () => {
    const newErrors = {};
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    

    if (!day) newErrors.day = 'Day is required';
    if (!month) newErrors.month = 'Month is required';
    if (!year) newErrors.year = 'Year is required';
    if (day && month && year && !isValidDate(day, month, year)) {
      newErrors.date = 'Invalid date';
    }
    if (birthDate > today) newErrors.past = 'must be in the past';
    if (birthDate > today) newErrors.must = 'must be  a valid month';
    if (birthDate > today) newErrors.done = 'must be a valid day';
    
  
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let ageYears = today.getFullYear() - year;
    let ageMonths = today.getMonth() - (month - 1);
    let ageDays = today.getDate() - day;

    if (ageDays < 0) {
      ageMonths--;
      ageDays += getDaysInMonth(month - 1, year);
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    setErrors({});
  };

  
  return (
    <div className='age-calculator'>
      <Form>
        <InputGroup className="mb-3">
        <div className="age-input-group">
        <label htmlFor="day-input">DAY</label>
        <Form.Control
          id="day-input"
          className="age-input"
          placeholder="DD"
          aria-label="Day"
          isInvalid={!!errors.day}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        {errors.day && <div className="error-message">{errors.day}</div>}
        {errors.date && <div className="error-message">{errors.date}</div>}
        {errors.done && <div className="error-message">{errors.done}</div>}
      </div>
      <div className="age-input-group">
        <label htmlFor="month-input">MONTH</label>
        <Form.Control
          id="month-input"
          className="age-input"
          placeholder="MM"
          aria-label="Month"
          isInvalid={!!errors.month}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
         {errors.month && <div className="error-message">{errors.month}</div>}
         {errors.must && <div className="error-message">{errors.must}</div>}
      </div>
      <div className="age-input-group">
        <label htmlFor="year-input">YEAR</label>
        <Form.Control
          id="year-input"
          className="age-input"
          placeholder="YYYY"
          aria-label="Year"
          isInvalid={!!errors.year}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
         {errors.year && <div className="error-message">{errors.year}</div>}
         {errors.past && <div className="error-message">{errors.past}</div>}
      </div>
        </InputGroup>

        <div className='line-button' >
        <img src="https://cdn.discordapp.com/attachments/1072570710867845135/1172996744469020702/Rectangle_6.png?ex=65625959&is=654fe459&hm=9807c6c5808b30725e1c238066a9db7fb5db77b71c18bbe319b865592fbaba35&" className='rectangle'/>
        <Button onClick={() => calculateAge(day, month, year)}  variant="primary">
       <img src="https://cdn.discordapp.com/attachments/1072570710867845135/1172992743254016110/Frame_29.png?ex=6562559f&is=654fe09f&hm=8b9bcfe2e89d0b323e1d087bec23d735a0d7811cc4921cbf728a2d69e369b2ef&" className='curve'/>
        </Button>
        </div>
      </Form>
      <div className="age-results">
        <h1>
          <span className="number">{age.years !== '--' ? age.years : '--'}</span>
          <span className="text"> years</span>
        </h1>
        <h2>
          <span className="number">{age.months !== '--' ? age.months : '--'}</span>
          <span className="text"> months</span>
        </h2>
        <h3>
          <span className="number">{age.days !== '--' ? age.days : '--'}</span>
          <span className="text"> days</span>
        </h3>
      </div>
    </div>
  );
};

export default AgeCalculator;
