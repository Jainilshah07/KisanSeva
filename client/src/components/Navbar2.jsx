import {
    ArrowDropDownOutlined,
    DarkModeOutlined,
    LightModeOutlined,
    Menu as MenuIcon,
    Search,
} from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Slide,
    Snackbar,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import Logout from "./Logout";
import { useMediaQuery } from "@mui/material";

// Transition for the custom dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar2 = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationOpen, setNotificationOpen] = useState(false); // State to manage notifications
    const [dialogOpen, setDialogOpen] = useState(false); // State to manage custom dialog
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const user2 = localStorage.getItem("user");
    const parsedUser = JSON.parse(user2);
    const isNonMediumScreens = useMediaQuery("(max-width: 960px)");

    const handleNotificationClick = () => {
        // Open notifications when the notifications icon is clicked
        setNotificationOpen(true);
        setDialogOpen(true); // Open custom dialog
    };

    const handleNotificationClose = () => {
        // Close notifications
        setNotificationOpen(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false); // Close custom dialog
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    flexDirection: isNonMediumScreens ? "column" : "row",
                    alignItems: isNonMediumScreens ? "flex-start" : undefined,
                }}
            >
                {/* LEFT SIDE */}
                <FlexBetween
                    sx={{
                        flexDirection: isNonMediumScreens ? "row" : "row",
                        alignItems: isNonMediumScreens ? "center" : undefined,
                        gap: isNonMediumScreens ? "1rem" : undefined,
                        width: "100%",
                    }}
                >
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    {!isNonMediumScreens && (
                        <FlexBetween
                            backgroundColor={theme.palette.background.alt}
                            borderRadius="9px"
                            gap="3rem"
                            p="0.1rem 1.5rem"
                        >
                            <InputBase placeholder="Search..." />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                    )}
                    {!isNonMediumScreens && (
                        <FlexBetween>
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.secondary[200],
                                    color: theme.palette.background.alt,
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    marginX: "10px",
                                }}
                                onClick={() => {
                                    navigate("/videocall");
                                }}
                            >
                                Video Call
                            </Button>
                        </FlexBetween>
                    )}
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween
                    gap={isNonMediumScreens ? "0.5rem" : "1.5rem"}
                    sx={{
                        marginTop: isNonMediumScreens ? "1rem" : 0,
                        flexDirection: isNonMediumScreens ? "row" : "row",
                        flexWrap: isNonMediumScreens ? "wrap" : "nowrap",
                    }}
                >
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "light" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton onClick={handleNotificationClick}>
                        <NotificationsIcon sx={{ fontSize: "25px" }} />
                    </IconButton>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[50] }}
                                >
                                    {parsedUser.email}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[50] }}
                                >
                                    {parsedUser.role}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Logout></Logout>
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>

            {/* Notification Snackbar */}
            <Snackbar
                open={notificationOpen}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
                message="You have new notifications!"
            />

            {/* Custom Dialog for notifications */}
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">New Notifications</DialogTitle>
                <DialogContent>
                    {/* Display your notifications here */}
                    <Typography>Payment Due on 15-02-24</Typography>
                    <Typography>Amount To Be Paid: 1000Rs</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
};

export default Navbar2;
