import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserCircle } from "react-icons/fa";
import { BsLock } from 'react-icons/bs';
import { logout as logOutApi } from "../api/authApi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    try {
        await logOutApi();
        toast.success("Logout successful");
        navigate("/");
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  }

  return (
    <div>
        <div className="py-1.5 rounded-2xl">
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

            >
                <FaUserCircle size={40} className="text-yellow-400" />
            </Button>
      </div>
     <div>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
        > 
                <MenuItem onClick={() => { handleClose(); handleLogOut();  }}><div className='text-red-500'><BsLock className='inline mr-2' />Logout</div></MenuItem>

        </Menu>
     </div>
    </div>
  );
}
