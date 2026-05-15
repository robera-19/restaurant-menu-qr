import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

export default function ScheduleManager({ item, onClose, onSave }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [repeat, setRepeat] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Schedule set successfully');
    onSave({ startTime, endTime, repeat });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Schedule Availability</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">Start Time</label>
            <DatePicker selected={startTime} onChange={setStartTime} showTimeSelect dateFormat="Pp" className="input" />
          </div>
          <div className="mb-4">
            <label className="label">End Time</label>
            <DatePicker selected={endTime} onChange={setEndTime} showTimeSelect dateFormat="Pp" className="input" />
          </div>
          <div className="mb-4">
            <label className="label">Repeat</label>
            <select value={repeat} onChange={(e) => setRepeat(e.target.value)} className="input">
              <option value="none">Don't repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">Save Schedule</button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
