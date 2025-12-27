import { AppBar, Toolbar, Typography, Button, Badge, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          E-Commerce Store
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/checkout")}
              startIcon={
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart />
                </Badge>
              }
              sx={{ textTransform: "none" }}
            >
              Cart
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

