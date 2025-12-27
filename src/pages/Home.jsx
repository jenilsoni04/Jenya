import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Chip,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  setCategory,
  fetchCategoriesRequest,
} from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

function Home() {
  console.log("Home component rendered");
  const dispatch = useDispatch();
  const { items, loading, error, total, skip, limit, categories, selectedCategory } =
    useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    const skipValue = (currentPage - 1) * limit;
    dispatch(
      fetchProductsRequest({
        skip: skipValue,
        limit,
        category: selectedCategory,
      })
    );
  }, [dispatch, currentPage, limit, selectedCategory]);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const totalPages = Math.ceil(total / limit);

  const formatCategoryName = (category) => {
    if (typeof category !== "string") {
      return String(category);
    }
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories && Array.isArray(categories) && categories.map((category) => (
              <MenuItem key={category} value={category}>
                {formatCategoryName(category)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedCategory && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`Category: ${formatCategoryName(selectedCategory)}`}
            onDelete={() => handleCategoryChange("")}
            color="primary"
          />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {items.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddToCart(product)}
                        size="small"
                      >
                        Add to Cart
                      </Button>
                    </Box>
                    {product.discountPercentage > 0 && (
                      <Chip
                        label={`${product.discountPercentage}% OFF`}
                        color="error"
                        size="small"
                        sx={{ mt: 1, alignSelf: "flex-start" }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;

