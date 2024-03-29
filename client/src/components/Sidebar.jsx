import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pay from "../hooks/usePay";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  // {
  //   text: "Products",
  //   icon: <ShoppingCartOutlined />,
  // },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Calendar",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  // {
  //   text: "Management",
  //   icon: null,
  // },
  // {
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  // },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);


  const amount = 500000;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const localuser = localStorage.getItem("user");

  const parsedUser = JSON.parse(localuser);
  const email = parsedUser.email;
  console.log(parsedUser.email);

  const paymentHandler = async (e) => {
    const payresponse = await fetch("http://localhost:4000/pay", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        cost: amount,

        ///role: role
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await fetch("http://localhost:4000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_hQAstdNzFYGx0d", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Kisan Seva", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:4000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant={isNonMobile ? 'permanent' : 'temporary'} // Use 'temporary' for mobile
          anchor="left"
          sx={{
            width: isNonMobile ? drawerWidth : '60vw', // Adjust the width for mobile
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              // backgroundColor: theme.palette.background.alt,
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m={isNonMobile ? "1.5rem 2rem 2rem 3rem" : "1rem"  }>
              <FlexBetween color={theme.palette.secondary[500]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant={isNonMobile ? 'h4' : 'h6'}
                    fontWeight="bold"
                  >  KISANSEVA
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} variant={isNonMobile ? 'h4' : 'h6'} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            // ? theme.palette.secondary[300]
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[900]
                            : theme.palette.secondary[50],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[900]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      {/* {isNonMobile && <ListItemText primary={text} />}  */}
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <List>
              <ListItem key="Pay" disablePadding>
                <ListItemButton
                  sx={{
                    color: theme.palette.secondary[50],
                  }}
                  onClick={paymentHandler}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color: theme.palette.secondary[200],
                    }}
                  >
                    <CurrencyRupeeIcon />
                  </ListItemIcon>
                  {/* {isNonMobile && <ListItemText primary="Pay" />}  */}
                  <ListItemText primary="Pay" />
                  {/* <ChevronRightOutlined sx={{ ml: "auto" }} /> */}
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;