import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import withAuth from "./HOC/withAuth";

function Product() {
  return (
    <>
      <h2>Đây là trang product</h2>
    </>
  );
}

export default withAuth(Product);
