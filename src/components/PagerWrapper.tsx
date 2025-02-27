import Container from "@mui/material/Container";
import { AnimatePresence, motion } from "framer-motion";

import React from 'react'


const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
function PagerWrapper({children}:{children:React.ReactNode}) {

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <Container sx={{ mt: 5 }}>{children}</Container>
  </motion.div>
  )
}

export default PagerWrapper