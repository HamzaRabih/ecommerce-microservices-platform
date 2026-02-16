# EOMMS - Angular Client

Angular client application for the E-commerce Order Management System (EOMMS). This is a complete microservices e-commerce platform using Spring Boot microservices with an Angular 17 frontend.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Dashboard overview
│   │   ├── customers/          # Customer management
│   │   ├── products/           # Product management
│   │   ├── bills/              # Billing and orders
│   │   └── config/             # System configuration
│   ├── services/               # HTTP services for backend APIs
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Route configuration
│   └── app.config.ts           # App configuration
├── styles.scss                 # Global styles
├── main.ts                     # Bootstrap entry point
└── index.html                  # HTML template
```

## Features

- **Dashboard**: System overview with statistics
- **Customer Management**: Create, read, update, delete customers
- **Product Management**: Manage inventory and products
- **Billing System**: Create bills with multiple items
- **System Configuration**: View microservice status and configuration
- **Responsive Design**: Works on desktop and mobile devices

## Microservices Integrated

- **Customer Service** (Port 8081): Manage customer data
- **Inventory Service** (Port 8082): Manage products and stock
- **Billing Service** (Port 8083): Handle orders and bills
- **Config Service** (Port 8084): Centralized configuration
- **Discovery Service** (Port 8761): Eureka service discovery
- **Gateway Service** (Port 8080): API Gateway

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- Backend microservices running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Navigate to `http://localhost:4200/`

### Building

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Routes

- `/` - Dashboard (default)
- `/customers` - Customer list
- `/customers/new` - Add new customer
- `/customers/edit/:id` - Edit customer
- `/products` - Product list
- `/products/new` - Add new product
- `/products/edit/:id` - Edit product
- `/bills` - Bill list
- `/bills/new` - Create new bill
- `/bills/edit/:id` - Edit bill
- `/bills/:id` - View bill details
- `/config` - System configuration

## Services

### Customer Service
- `getAllCustomers()` - Fetch all customers
- `getCustomerById(id)` - Get single customer
- `createCustomer(customer)` - Create new customer
- `updateCustomer(id, customer)` - Update customer
- `deleteCustomer(id)` - Delete customer
- `searchCustomers(name)` - Search customers

### Product Service
- `getAllProducts()` - Fetch all products
- `getProductById(id)` - Get single product
- `createProduct(product)` - Create new product
- `updateProduct(id, product)` - Update product
- `deleteProduct(id)` - Delete product
- `searchProducts(name)` - Search products

### Billing Service
- `getAllBills()` - Fetch all bills
- `getBillById(id)` - Get single bill
- `createBill(bill)` - Create new bill
- `updateBill(id, bill)` - Update bill
- `deleteBill(id)` - Delete bill
- `getBillsByCustomer(customerId)` - Get customer bills
- `saveBillWithItems(bill)` - Create bill with items

### Config Service
- `getConfig()` - Get configuration properties
- `getConfigProperty(key)` - Get specific property
- `refreshConfig()` - Refresh configuration
- `getHealthStatus()` - Check health status

## Technologies Used

- **Angular 17**: Frontend framework
- **TypeScript**: Programming language
- **RxJS**: Reactive programming
- **Angular Router**: Client-side routing
- **Angular Forms**: Form handling (FormsModule)
- **HttpClient**: HTTP communication
- **SCSS**: Styling

## Code Structure

### Components (Standalone)

All components are standalone Angular components, which means they are self-contained with their own dependencies.

Example:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`,
  styles: [`...`]
})
export class ExampleComponent { }
```

### Services (Provided in root)

Services use `providedIn: 'root'` for dependency injection:

```typescript
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  // Service implementation
}
```

## Configuration

Update API URLs in the service files if your backend services are running on different ports:

- [Customer Service](src/app/services/customer.service.ts#L13)
- [Product Service](src/app/services/product.service.ts#L13)
- [Billing Service](src/app/services/billing.service.ts#L19)
- [Config Service](src/app/services/config.service.ts#L13)

## Development Workflow

1. Create components with `ng generate component component-name` (or manually)
2. Create services with proper error handling
3. Use standalone components and services
4. Add routes in `app.routes.ts`
5. Style components with SCSS

## Error Handling

Components include error handling for failed API calls with user-friendly messages displayed via alert components.

## Future Enhancements

- Authentication and authorization
- Advanced filtering and pagination
- Real-time updates with WebSocket
- Export to PDF/Excel
- Multi-language support
- Dark theme

## License

MIT

## Author

Created as part of the Distributed Systems and DevOps course (Systèmes Distribués & DevOps) at ENSET Mohammedia.
