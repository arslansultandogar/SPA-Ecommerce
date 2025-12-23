# E-Commerce Product Listing SPA

A modern, responsive Single Page Application (SPA) for browsing and filtering products built with Next.js, React, and pure CSS.

## ✨ Features

### Authentication
- **Login Page**: Hardcoded admin credentials (Username: `Admin`, Password: `123456`)
- **Session Management**: Login state persisted in localStorage
- **Protected Routes**: Dashboard routes require authentication

### Product Listing
- **150+ Products**: Realistic mock data with comprehensive product attributes
- **Product Attributes**:
  - Name and description
  - Price with original price and discount percentage
  - Star ratings and review counts
  - Availability status with stock information
  - Product category and brand
  - Discount information

### Filtering & Sorting
- **Search Filter**: Find products by name (case-insensitive)
- **Price Range Filter**: Set minimum and maximum price range
- **Availability Filter**: Show only available products
- **Multi-Sort Options**:
  - Sort by Price (ascending/descending)
  - Sort by Name (alphabetical)
  - Sort by Rating (highest/lowest)
  - Sort by Discount (highest/lowest)
- **Performance Optimized**: Efficient sorting and filtering algorithms

### Pagination
- **Smart Pagination**: 12 products per page
- **Navigation Controls**: Previous/Next buttons and page number buttons
- **Ellipsis Support**: Shows page numbers with "..." for large result sets
- **Responsive**: Adapts button display on mobile devices

### User Interface
- **Responsive Design**: Mobile-first approach supporting all screen sizes
  - Desktop (1024px+)
  - Tablet (768px - 1023px)
  - Mobile (480px - 767px)
  - Extra small devices (< 480px)

- **Header**: Displays current page title and menu toggle
- **Sidebar Navigation**: Navigate between Welcome and Products pages
- **Dashboard Layout**: Protected authenticated area with navigation

### Animations & Transitions
- **Smooth Animations**:
  - Fade-in effects on page load
  - Slide animations for components
  - Bounce animation on welcome icon
  - Scale and transform effects on buttons
  - Smooth color transitions
  - Shake effect for error messages

- **Interactive Elements**:
  - Hover effects on product cards and buttons
  - Active state styling on navigation links
  - Loading spinner during data fetch
  - Smooth page scrolling

### Styling
- **CSS Features**:
  - CSS Grid and Flexbox layouts
  - CSS custom properties (variables)
  - Media queries for responsive design
  - Gradient backgrounds
  - Box shadows and borders
  - Transitions and animations
  - Backdrop filters

- **Accessibility**:
  - Semantic HTML
  - ARIA labels
  - Focus states
  - Color contrast compliance
  - Keyboard navigation support

## 📁 Project Structure

```
e-com-project/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   ├── page.js              # Login page component
│   │   │   └── login.css            # Login page styles
│   │   ├── dashboard/
│   │   │   ├── layout.js            # Dashboard layout wrapper
│   │   │   ├── dashboard.css        # Dashboard layout styles
│   │   │   ├── page.js              # Welcome/home page
│   │   │   ├── welcome.css          # Welcome page styles
│   │   │   └── products/
│   │   │       ├── page.js          # Products listing page
│   │   │       └── products.css     # Products page styles
│   │   ├── layout.js                # Root layout with AuthProvider
│   │   ├── page.js                  # Home page (redirects to login)
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── Header.js                # Page header component
│   │   ├── Header.css               # Header styles
│   │   ├── Sidebar.js               # Navigation sidebar component
│   │   ├── Sidebar.css              # Sidebar styles
│   │   ├── ProductCard.js           # Individual product card
│   │   ├── ProductCard.css          # Product card styles
│   │   ├── ProductFilters.js        # Filter and sort controls
│   │   ├── ProductFilters.css       # Filter styles
│   │   ├── PaginationControls.js    # Pagination navigation
│   │   └── PaginationControls.css   # Pagination styles
│   ├── context/
│   │   └── AuthContext.js           # Authentication context
│   └── services/
│       └── productService.js        # Product data service
├── package.json
├── next.config.mjs
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd e-com-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 🔐 Login Credentials

The application uses hardcoded admin credentials:

- **Username**: `Admin`
- **Password**: `123456`

For convenience, a "Use Demo Credentials" button is available on the login page.

## 📖 Usage Guide

### Login
1. Navigate to the home page (redirects automatically)
2. Enter credentials:
   - Username: `Admin`
   - Password: `123456`
3. Click "Login" or use "Use Demo Credentials" button
4. You'll be redirected to the dashboard

### Browse Products
1. Click "Products" in the sidebar to view the product listing
2. Products are displayed in a responsive grid
3. Each product card shows:
   - Product image (placeholder)
   - Discount badge (if applicable)
   - Availability status
   - Product name and description
   - Star rating and review count
   - Price with discount
   - Stock information
   - Add to cart button

### Filter Products
1. Use the **Search box** to find products by name
2. Set **Price Range** with min and max values
3. Toggle **Availability** to show only in-stock items
4. Click **Reset All Filters** to clear all filters

### Sort Products
Choose from multiple sort options:
- **Price**: Sort by product price (ascending ↑ / descending ↓)
- **Name**: Sort alphabetically by product name
- **Rating**: Sort by customer rating
- **Discount**: Sort by discount percentage

Click the same sort button to toggle between ascending and descending order.

### Navigate Pages
- Use **Previous/Next** buttons for page navigation
- Click **page numbers** to jump to specific pages
- Current page is highlighted
- Page info shows current position

### Logout
1. Click the **Logout** button (🚪) in the sidebar footer
2. You'll be redirected to the login page

## 🛠️ Technical Implementation

### Authentication (AuthContext.js)
- Custom React Context for global auth state
- Login function validates hardcoded credentials
- Session persisted in localStorage
- useAuth hook for easy access to auth state

### Product Service (productService.js)
The service provides optimized functions:

```javascript
// Fetch all products with mock data
const products = await fetchProducts();

// Sort products efficiently
const sorted = sortProducts(products, 'price', 'desc');

// Filter by multiple criteria
const filtered = filterProducts(products, {
  searchTerm: 'phone',
  minPrice: 100,
  maxPrice: 500,
  onlyAvailable: true
});

// Combined operation with pagination
const result = await getProcessedProducts({
  page: 1,
  limit: 12,
  sortBy: 'price',
  sortOrder: 'desc',
  filters: { ... }
});
```

### Performance Optimization
1. **Sorting Algorithm**: Uses native JavaScript `.sort()` with optimized comparators
2. **Filtering**: Single-pass filtering to avoid multiple iterations
3. **Pagination**: Client-side pagination for instant response
4. **Component Memoization**: useCallback for filter/sort handlers to prevent unnecessary re-renders
5. **Lazy Loading**: CSS optimizations with animations using GPU acceleration

### State Management
- React Hooks (useState, useContext, useEffect, useCallback)
- Context API for global authentication state
- Local component state for filters and pagination

### Responsive Design
- Mobile-first CSS approach
- Flexible Grid layouts
- Media queries at key breakpoints:
  - 1024px (tablet)
  - 768px (small tablet/mobile)
  - 480px (mobile)
  - 360px (extra small)

## 🎨 Styling Approach

### CSS Architecture
- **Organized files**: Each component has its own CSS file
- **CSS Variables**: Global color scheme and spacing
- **Flexbox & Grid**: Modern layout techniques
- **Media Queries**: Responsive design at multiple breakpoints
- **Animations**: Smooth transitions and keyframe animations
- **Accessibility**: Focus states, color contrast, ARIA labels

### Color Scheme
- **Primary**: #667eea (blue-red gradient)
- **Dark Primary**: #764ba2 (darker red)
- **Accent**: #f5576c (pink-red gradient)
- **Background**: #f5f5f5 (light gray)
- **Text**: #333 (dark gray)
- **Border**: #e0e0e0 (light border)

## 📱 Responsive Breakpoints

| Device | Width | Changes |
|--------|-------|---------|
| Desktop | 1024px+ | Full layout, sidebar visible |
| Tablet | 768px - 1023px | Responsive grid, sidebar toggleable |
| Mobile | 480px - 767px | Single column, mobile-optimized |
| Extra Small | < 480px | Compact buttons, hidden elements |

## 🔄 Data Flow

1. **Login Flow**:
   ```
   Login Page → AuthContext.login() → localStorage → Redirect to Dashboard
   ```

2. **Product Fetch Flow**:
   ```
   Products Page → getProcessedProducts() → Filter → Sort → Paginate → Render
   ```

3. **Filter Update Flow**:
   ```
   User changes filter → handleFilterChange() → useEffect → refetch and re-render
   ```

## 🧪 Testing the Application

### Test Login
- ✅ Valid credentials (Admin/123456) - should login successfully
- ✅ Invalid credentials - should show error popup
- ✅ Empty fields - should show validation error

### Test Products
- ✅ Products load on page visit
- ✅ All 150 products are available
- ✅ Search filter works for product names
- ✅ Price range filter works
- ✅ Availability filter shows only available items
- ✅ All sort options work correctly
- ✅ Pagination navigates through pages
- ✅ Page changes scroll to top smoothly

### Test Responsive Design
- ✅ Desktop view with sidebar
- ✅ Tablet view with responsive grid
- ✅ Mobile view with hamburger menu
- ✅ All breakpoints display correctly

### Test Animations
- ✅ Fade-in effects on page load
- ✅ Hover effects on interactive elements
- ✅ Smooth scrolling
- ✅ Loading spinner shows
- ✅ Error messages shake animation

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Currently, no environment variables are required. The app uses hardcoded demo data.

For production with a real API:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📚 Code Quality

### Code Comments
- Detailed JSDoc comments for all functions
- Inline comments explaining complex logic
- Component purpose documented at the top
- Algorithm explanations for sorting/filtering

### Best Practices
- Semantic HTML structure
- Accessibility (ARIA labels, keyboard navigation)
- Error handling and loading states
- Performance optimizations
- Clean, readable code structure
- Consistent naming conventions

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use:
```bash
npm run dev -- -p 3001
```

### Build Cache Issues
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Styles Not Loading
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Ensure CSS files are in the same directory as components
- Check CSS import paths

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues or questions, please refer to the code comments and documentation within the project files.

---

**Built with**: Next.js • React • CSS • JavaScript

**Last Updated**: December 23, 2025
