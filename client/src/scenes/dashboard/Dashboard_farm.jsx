import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import Crispjs from "components/Crisp";
import { useNavigate } from "react-router-dom";
// Import Gemini and data
import { GoogleGenerativeAI } from "@google/generative-ai";

const Dashboard2 = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(max-width: 960px)");
  const { data, isLoading } = useGetDashboardQuery();
  const navigate = useNavigate();
  const [cropPrediction, setCropPrediction] = useState("");
  // const user = localStorage.getItem("user");
  // console.log(user);

  const API_KEY = "AIzaSyCwHHCLAEInXJrGE1ZS1XsWhLz4L4yUMkw";
  useEffect(() => {
    // Initialize Gemini and make prediction
    const runGemini = async () => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt =
        "Predict the most profitable commodity to grow based on the given data, just give output as crop name, its okk if you give a rough answer, you can calculate which commodity had the most max_price and display that";
      const data = [
        {
          APMC: "Ahmednagar",
          Commodity: "Bajri",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 79,
          min_price: 1406,
          max_price: 1538,
          modal_price: 1463,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Bajri",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 106,
          min_price: 1788,
          max_price: 1925,
          modal_price: 1875,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Wheat(Husked)",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 1253,
          min_price: 1572,
          max_price: 1890,
          modal_price: 1731,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Wheat(Husked)",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 387,
          min_price: 1750,
          max_price: 2220,
          modal_price: 1999,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Sorgum(Jawar)",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 3825,
          min_price: 1600,
          max_price: 2200,
          modal_price: 1900,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Sorgum(Jawar)",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 2093,
          min_price: 1695,
          max_price: 2454,
          modal_price: 2119,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Maize",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 75,
          min_price: 1345,
          max_price: 1401,
          modal_price: 1373,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Maize",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 155,
          min_price: 1367,
          max_price: 1392,
          modal_price: 1375,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Gram",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 1794,
          min_price: 3533,
          max_price: 3762,
          modal_price: 3647,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Gram",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 630,
          min_price: 4790,
          max_price: 5553,
          modal_price: 5216,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Horse Gram",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 3,
          min_price: 7150,
          max_price: 7150,
          modal_price: 7150,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Matki",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 1,
          min_price: 7500,
          max_price: 7500,
          modal_price: 7500,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Pigeon Pea (Tur)",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 144,
          min_price: 4993,
          max_price: 5373,
          modal_price: 5233,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Pigeon Pea (Tur)",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 33,
          min_price: 6900,
          max_price: 7700,
          modal_price: 7329,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Black Gram",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 7,
          min_price: 5700,
          max_price: 5700,
          modal_price: 5700,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Black Gram",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 2,
          min_price: 7500,
          max_price: 7500,
          modal_price: 7500,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Castor Seed",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 3,
          min_price: 3313,
          max_price: 3313,
          modal_price: 3313,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Soybean",
          Year: 2015,
          Month: "April",
          arrivals_in_qtl: 12,
          min_price: 2900,
          max_price: 3400,
          modal_price: 3150,
          date: "2015-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
        {
          APMC: "Ahmednagar",
          Commodity: "Soybean",
          Year: 2016,
          Month: "April",
          arrivals_in_qtl: 20,
          min_price: 2200,
          max_price: 3900,
          modal_price: 3603,
          date: "2016-04",
          district_name: "Ahmadnagar",
          state_name: "Maharashtra",
        },
      ];

      // Prompt for Gemini
      // const result = await model.generateContent(prompt);
      // const response = await result.response;
      // const text = await response.text();
      // setCropPrediction(text);
    };

    // runGemini();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <>
      <Crispjs />
      <Box m={isNonMediumScreens ? "0.5rem 0.5rem" : "1.5rem 2.5rem"}>
        <FlexBetween
          sx={{
            flexDirection: isNonMediumScreens ? "column" : "row",
            alignItems: isNonMediumScreens ? "center" : undefined,
            gap: isNonMediumScreens ? "1rem" : undefined,
          }}
        >
          <Header title="Namaste Kisan!!" subtitle="Welcome to your dashboard" isSidebarOpen={false} />
          <Box
            sx={{
              display: "flex",
              flexDirection: isNonMediumScreens ? "row" : "row",
              alignItems: isNonMediumScreens ? "center" : undefined,
              gap: isNonMediumScreens ? "0.5rem" : "1rem",
              flexWrap: isNonMediumScreens ? "wrap" : "nowrap", // Add flexWrap for mobile view
            }}
          >
            <Button
              sx={{
                // backgroundColor: `#d5dcee`,
                backgroundColor: theme.palette.secondary[200],
                color: theme.palette.background.alt,
                fontSize: isNonMediumScreens ? "12px" : "14px",
                fontWeight: "bold",
                padding: isNonMediumScreens ? "8px 16px" : "10px 20px",
              }}
              onClick={() => {
                navigate("/form");
              }}
            >
              Check CIBIL Score
            </Button>
            <Button
              sx={{
                // backgroundColor: `#E2E4EE`,
                backgroundColor: theme.palette.secondary[200],
                color: theme.palette.background.alt,
                fontSize: isNonMediumScreens ? "12px" : "14px",
                fontWeight: "bold",
                padding: isNonMediumScreens ? "8px 16px" : "10px 20px",
                marginLeft: isNonMediumScreens ? 0 : "10px",
              }}
              onClick={() => {
                navigate("/news");
              }}
            >
              Best Practices
            </Button>
          </Box>
        </FlexBetween>

        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={isNonMediumScreens ? "1fr" : "repeat(12, 1fr)"}
          gridAutoRows={isNonMediumScreens ? "auto" : "160px"}
          gap={isNonMediumScreens ? "10px" : "20px"} // Reduce gap between grid items
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? "span 1" : undefined,
            },
          }}
        >
          {/* ROW 1 */}
          <StatBox
            title="Crop Prediction"
            value={cropPrediction}
            increase=""
            description="Most profitable crop to grow"
            icon={
              <Traffic
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: isNonMediumScreens ? "18px" : "26px",
                }}
              />
            }
            sx={{
              p: isNonMediumScreens ? "0.25rem" : "1rem", // Reduce padding for mobile view
            }}
          />
          <StatBox
            title="Sales Today"
            value={data && data.todayStats.totalSales}
            increase="+21%"
            description="Since last month"
            icon={
              <PointOfSale
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: isNonMediumScreens ? "18px" : "26px",
                }}
              />
            }
            sx={{
              p: isNonMediumScreens ? "0.5rem" : "1rem",
            }}
          />
          <Box
            gridColumn={isNonMediumScreens ? "span 1" : "span 8"}
            gridRow={isNonMediumScreens ? "auto" : "span 2"}
            backgroundColor={theme.palette.background.alt}
            p={isNonMediumScreens ? "0.5rem" : "1rem"} // Reduce padding for mobile view
            borderRadius="0.55rem"
            sx={{
              maxHeight: isNonMediumScreens ? "320px" : "auto",
              overflowY: isNonMediumScreens ? "auto" : "unset",
            }}
          >
            <OverviewChart view="sales" isDashboard={true} />
          </Box>
          <StatBox
            title="Monthly Sales"
            value={data && data.thisMonthStats.totalSales}
            increase="+5%"
            description="Since last month"
            icon={
              <PersonAdd
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: isNonMediumScreens ? "18px" : "26px",
                }}
              />
            }
            sx={{
              p: isNonMediumScreens ? "0.5rem" : "1rem",
            }}
          />
          <StatBox
            title="Yearly Sales"
            value={data && data.yearlySalesTotal}
            increase="+43%"
            description="Since last month"
            icon={
              <Traffic
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: isNonMediumScreens ? "18px" : "26px",
                }}
              />
            }
            sx={{
              p: isNonMediumScreens ? "0.5rem" : "1rem",
            }}
          />

          {/* ROW 2 */}
          <Box
            gridColumn={isNonMediumScreens ? "span 1" : "span 7"}
            gridRow={isNonMediumScreens ? "auto" : "span 3"}
            display="flex"
            flexDirection={isNonMediumScreens ? "column" : "column"}
            justifyContent={isNonMediumScreens ? "center" : "space-between"}
            alignItems={isNonMediumScreens ? "center" : "stretch"}
            p={isNonMediumScreens ? "0.5rem" : "1.25rem 1rem"}
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
          >
            <FlexBetween
              sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }}
              >
                Number of Loans Applied:
              </Typography>
              5
            </FlexBetween>

            <FlexBetween
              sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.2rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.2rem",
                }}
              >
                Total Loan Amount:
              </Typography>
              5,00,000
            </FlexBetween>


            <FlexBetween sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
              >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }} >
                Loan Repaid:
              </Typography>
              1,25,900
            </FlexBetween>

            <FlexBetween sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
              >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }} >
                Amount Left to be Repaid:
              </Typography>
              3,74,100
            </FlexBetween>


            <FlexBetween sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
              >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }} >
                Rate of Interest:
              </Typography>
              8%
            </FlexBetween>

            <FlexBetween sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
              >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }} >
                Loan Repayment Date:
              </Typography>
              15-01-2024
            </FlexBetween>

            <FlexBetween sx={{
                padding: isNonMediumScreens ? "1rem 0.5rem" : "3%",
                color: theme.palette.secondary[100],
                fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
              }}
              >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  fontSize: isNonMediumScreens ? "1rem" : "1.3rem",
                }} >
                Next Repayment Date:
              </Typography>
              15-02-2024
            </FlexBetween>

          </Box>
          {!isNonMediumScreens && (
            <Box
              gridColumn="span 5"
              gridRow="span 3"
              backgroundColor={theme.palette.background.alt}
              p={isNonMediumScreens ? "0.5rem" : "1rem"}
              borderRadius="0.55rem"
            >
              <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                Sales By Category
              </Typography>
              <BreakdownChart isDashboard={true} />
            </Box>
          )}
        </Box>

      </Box>

    </>
  );
};

export default Dashboard2;


