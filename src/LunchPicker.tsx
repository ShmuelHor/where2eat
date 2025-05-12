import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import {
  LunchDining,
  Fastfood,
  LocalDining,
  RamenDining,
  Language,
  Celebration,
  Restaurant,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const stores = [
  { name: "goldis", icon: <LunchDining fontSize="large" /> }, // אוכל מוכן
  { name: "burger", icon: <Fastfood fontSize="large" /> },
  { name: "halawla", icon: <Restaurant fontSize="large" /> }, // חלה עם שניצל
  { name: "iwa", icon: <LocalDining fontSize="large" /> }, // אוכל לפי משקל
  { name: "hummus", icon: <RamenDining fontSize="large" /> }, // חומוס
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

function getWeekNumber(date: Date): number {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((+date - +jan1) / 86400000);
  return Math.ceil((date.getDay() + 1 + days) / 7);
}

function getWeeklyAssignment(): typeof stores {
  const today = new Date();
  const seed = `${getWeekNumber(today)}-${today.getFullYear()}`;
  const shuffled = [...stores].sort((a, b) =>
    hash(seed + a.name + b.name) > 0 ? 1 : -1
  );
  return shuffled.slice(0, 5);
}

export default function LunchPicker() {
  const { t } = useTranslation();
  const today = new Date();
  const weekdayIndex = today.getDay();
  const assignment = useMemo(() => getWeeklyAssignment(), []);
  const store =
    weekdayIndex >= 0 && weekdayIndex <= 4 ? assignment[weekdayIndex] : null;

  const [eaten, setEaten] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleLang = () => {
    const next = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(next);
  };

  const handleEat = () => {
    setEaten(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Box
        sx={{
          minHeight: "100dvh",
          bgcolor: "linear-gradient(135deg, #1de9b6, #00acc1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: "100%" }}
        >
          <Container maxWidth="sm" sx={{ width: "100%" }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Paper
                elevation={12}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  background: "#ffffff",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    onClick={toggleLang}
                    startIcon={<Language />}
                    size="small"
                    sx={{ color: "#00acc1", fontWeight: "bold" }}
                  >
                    {t("changeLang")}
                  </Button>
                </Box>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    color="#00796b"
                    sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    {t("title")}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    {t("subtitle")}
                  </Typography>
                </motion.div>

                <Divider sx={{ my: 4 }} />

                <AnimatePresence>
                  {store && !eaten && (
                    <motion.div
                      initial={{ opacity: 0, y: 100, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: -400,
                        scale: 0.3,
                        rotate: 15,
                        filter: "blur(3px)",
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Card
                        sx={{
                          bgcolor: "#009688",
                          color: "white",
                          borderRadius: 4,
                          py: 3,
                          px: 2,
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {t("todayChoice")}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                            mt={2}
                          >
                            {store.icon}
                            <Typography variant="h5" fontWeight="bold">
                              {t(store.name)}
                            </Typography>
                          </Box>
                          <Box mt={3} display="flex" justifyContent="center">
                            <Button
                              onClick={handleEat}
                              variant="contained"
                              endIcon={<Celebration />}
                              sx={{
                                bgcolor: "#ffca28",
                                color: "#3e2723",
                                fontWeight: "bold",
                                borderRadius: 999,
                                px: 3,
                                py: 1,
                                textTransform: "none",
                                fontSize: "1rem",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: "#ffc107",
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              {t("yummy")}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!store && (
                  <Typography color="text.secondary" mt={4} textAlign="center">
                    {t("weekend")}
                  </Typography>
                )}

                {/* לוח לשבוע הקרוב */}
                <Box mt={5}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    textAlign="center"
                  >
                    {t("weekSchedule")}
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    {[
                      "sunday",
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                    ].map((dayKey, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: { xs: "50%", sm: "33.33%" },
                          px: 1,
                          mb: 2,
                        }}
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 4,
                            bgcolor: weekdayIndex === i ? "#e0f2f1" : "white",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="text.secondary"
                          >
                            {t(dayKey)}
                          </Typography>
                          <Box mt={1}>{assignment[i]?.icon}</Box>
                          <Typography variant="body2">
                            {t(assignment[i]?.name || "")}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Container>
        </motion.div>
      </Box>
    </motion.div>
  );
}
