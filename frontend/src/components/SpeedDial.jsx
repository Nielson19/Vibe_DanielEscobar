import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FaCopy, FaSave, FaPrint, FaShareAlt } from 'react-icons/fa';

const actions = [
  { icon: <FaCopy />, name: 'Copy' },
  { icon: <FaSave />, name: 'Save' },
  { icon: <FaPrint />, name: 'Print' },
  { icon: <FaShareAlt />, name: 'Share' },
];

export default function BasicSpeedDial() {
  return (
    <div className='absolute right-10 bottom-5'>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
            direction='up'
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon size="small" />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{
                tooltip: {
                    title: action.name,
                },
                }}
            />
            ))}
        </SpeedDial>
        </Box>
    </div>
  );
}
