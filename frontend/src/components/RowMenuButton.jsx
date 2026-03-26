import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaEllipsisV, FaRegTrashAlt } from 'react-icons/fa';

export default function RowMenuButton({ onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    if (onDelete) onDelete();
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'row-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        style={{ minWidth: 0 }}
      >
        <FaEllipsisV size={20} className="text-gray-400" />
      </Button>
      <Menu
        id="row-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDelete}>
          <span className="text-red-500 flex items-center gap-2"><FaRegTrashAlt /> Delete</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
