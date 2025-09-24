import { useState, useEffect } from 'react';
import '../../cssFile/Help-css/Quickmsg.css';

export default function QuickMsg({ msg }) {
  const [visible, setVisible] = useState('');

  useEffect(() => {
    if (!msg) return;

    setVisible(msg.split('%-+%')[0]); 
    const timer = setTimeout(() => setVisible(''), 3000); 

    return () => clearTimeout(timer);
  }, [msg]);

  if (!visible) return null;

  return (
    <div className='quickmsg'>
      <p>{visible}</p>
    </div>
  );
}
