/**
 * @fileoverview E-commerce Layout System v5.0.0 - Enterprise E-commerce Layouts
 * @description Comprehensive e-commerce layouts for product pages, checkout, payment, and invoices
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// E-COMMERCE LAYOUT VARIANTS
// =============================================================================

const ecommerceLayoutVariants = cva(
  [
    'w-full',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        product: 'container mx-auto px-4 py-8',
        checkout: 'max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8',
        payment: 'max-w-2xl mx-auto px-4 py-8',
        invoice: 'max-w-4xl mx-auto px-4 py-8',
        cart: 'max-w-4xl mx-auto px-4 py-8',
        catalog: 'container mx-auto px-4 py-6',
      },
      spacing: {
        tight: 'space-y-4',
        normal: 'space-y-6',
        relaxed: 'space-y-8',
        loose: 'space-y-12',
      },
    },
    defaultVariants: {
      layout: 'product',
      spacing: 'normal',
    },
  }
);

const productLayoutVariants = cva(
  [
    'grid gap-8',
  ],
  {
    variants: {
      variant: {
        standard: 'grid-cols-1 lg:grid-cols-2',
        detailed: 'grid-cols-1 lg:grid-cols-3',
        minimal: 'grid-cols-1',
        showcase: 'grid-cols-1 xl:grid-cols-[2fr_1fr]',
      },
      alignment: {
        top: 'items-start',
        center: 'items-center',
        stretch: 'items-stretch',
      },
    },
    defaultVariants: {
      variant: 'standard',
      alignment: 'top',
    },
  }
);

const productGalleryVariants = cva(
  [
    'space-y-4',
  ],
  {
    variants: {
      layout: {
        stacked: 'flex flex-col',
        grid: 'grid grid-cols-2 gap-4',
        carousel: 'flex flex-col space-y-4',
        thumbnail: 'flex flex-col space-y-4',
      },
      aspectRatio: {
        square: '[&_img]:aspect-square',
        portrait: '[&_img]:aspect-[3/4]',
        landscape: '[&_img]:aspect-[4/3]',
        wide: '[&_img]:aspect-[16/9]',
      },
    },
    defaultVariants: {
      layout: 'thumbnail',
      aspectRatio: 'square',
    },
  }
);

const checkoutStepsVariants = cva(
  [
    'flex items-center justify-center',
    'mb-8 p-4',
    'bg-secondary/30 rounded-lg',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      orientation: {
        horizontal: 'flex-row space-x-4',
        vertical: 'flex-col space-y-4',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
);

const orderSummaryVariants = cva(
  [
    'bg-card border border-border rounded-lg',
    'sticky top-8',
  ],
  {
    variants: {
      variant: {
        default: 'p-6',
        compact: 'p-4',
        detailed: 'p-8',
      },
      position: {
        sidebar: 'self-start',
        floating: 'shadow-lg',
        inline: 'static',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'sidebar',
    },
  }
);

const invoiceVariants = cva(
  [
    'bg-card border border-border rounded-lg p-8',
    'shadow-sm',
  ],
  {
    variants: {
      variant: {
        standard: 'space-y-8',
        minimal: 'space-y-6',
        detailed: 'space-y-10',
      },
      printable: {
        true: 'print:shadow-none print:border-0 print:rounded-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'standard',
      printable: true,
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface EcommerceLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'product' | 'checkout' | 'payment' | 'invoice' | 'cart' | 'catalog';
  readonly spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  readonly 'aria-label'?: string;
}

export interface ProductLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly variant?: 'standard' | 'detailed' | 'minimal' | 'showcase';
  readonly alignment?: 'top' | 'center' | 'stretch';
}

export interface ProductGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly images: readonly ProductImage[];
  readonly layout?: 'stacked' | 'grid' | 'carousel' | 'thumbnail';
  readonly aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  readonly onImageClick?: (image: ProductImage, index: number) => void;
}

export interface ProductImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly thumbnail?: string;
  readonly width?: number;
  readonly height?: number;
}

export interface ProductDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly product?: {
    readonly name: string;
    readonly price: string;
    readonly originalPrice?: string;
    readonly rating?: number;
    readonly reviewCount?: number;
    readonly availability?: 'in-stock' | 'out-of-stock' | 'limited';
    readonly sku?: string;
  };
  readonly showPricing?: boolean;
  readonly showRating?: boolean;
  readonly showAvailability?: boolean;
}

export interface CheckoutStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly steps: readonly CheckoutStep[];
  readonly currentStep: number;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly orientation?: 'horizontal' | 'vertical';
  readonly onStepClick?: (step: number) => void;
}

export interface CheckoutStep {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly status: 'pending' | 'current' | 'completed' | 'disabled';
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly items: readonly OrderItem[];
  readonly shipping?: OrderShipping;
  readonly taxes?: OrderTax[];
  readonly discounts?: OrderDiscount[];
  readonly total: OrderTotal;
  readonly variant?: 'default' | 'compact' | 'detailed';
  readonly position?: 'sidebar' | 'floating' | 'inline';
  readonly editable?: boolean;
  readonly onItemChange?: (itemId: string, quantity: number) => void;
  readonly onItemRemove?: (itemId: string) => void;
}

export interface OrderItem {
  readonly id: string;
  readonly name: string;
  readonly image?: string;
  readonly price: string;
  readonly quantity: number;
  readonly variant?: string;
  readonly sku?: string;
}

export interface OrderShipping {
  readonly method: string;
  readonly cost: string;
  readonly estimatedDelivery?: string;
}

export interface OrderTax {
  readonly name: string;
  readonly amount: string;
  readonly rate?: string;
}

export interface OrderDiscount {
  readonly code: string;
  readonly name: string;
  readonly amount: string;
  readonly type: 'percentage' | 'fixed';
}

export interface OrderTotal {
  readonly subtotal: string;
  readonly shipping: string;
  readonly tax: string;
  readonly discount?: string;
  readonly total: string;
}

export interface InvoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly invoice: InvoiceData;
  readonly variant?: 'standard' | 'minimal' | 'detailed';
  readonly printable?: boolean;
  readonly onPrint?: () => void;
  readonly onDownload?: () => void;
}

export interface InvoiceData {
  readonly number: string;
  readonly date: string;
  readonly dueDate?: string;
  readonly status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  readonly from: InvoiceContact;
  readonly to: InvoiceContact;
  readonly items: readonly InvoiceItem[];
  readonly subtotal: string;
  readonly tax: string;
  readonly total: string;
  readonly notes?: string;
  readonly terms?: string;
}

export interface InvoiceContact {
  readonly name: string;
  readonly company?: string;
  readonly address: readonly string[];
  readonly email?: string;
  readonly phone?: string;
}

export interface InvoiceItem {
  readonly id: string;
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: string;
  readonly total: string;
}

// =============================================================================
// PRODUCT GALLERY COMPONENT
// =============================================================================

export const ProductGallery = forwardRef<HTMLDivElement, ProductGalleryProps>(
  (
    {
      images,
      layout = 'thumbnail',
      aspectRatio = 'square',
      onImageClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [selectedImage, setSelectedImage] = React.useState(0);

    const handleImageClick = (image: ProductImage, index: number): void => {
      setSelectedImage(index);
      onImageClick?.(image, index);
    };

    return (
      <div
        ref={ref}
        className={cn(productGalleryVariants({ layout, aspectRatio }), className)}
        {...props}
      >
        {/* Main Image */}
        <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
          <img
            src={images[selectedImage]?.src}
            alt={images[selectedImage]?.alt}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => handleImageClick(images[selectedImage], selectedImage)}
          />
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image, index)}
                className={cn(
                  'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                  index === selectedImage 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-border'
                )}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ProductGallery.displayName = 'ProductGallery';

// =============================================================================
// PRODUCT DETAILS COMPONENT
// =============================================================================

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  (
    {
      children,
      product,
      showPricing = true,
      showRating = true,
      showAvailability = true,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn('space-y-6', className)}
        {...props}
      >
        {product && (
          <>
            {/* Product Name */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              {product.sku && (
                <p className="text-sm text-muted-foreground mt-1">
                  SKU: {product.sku}
                </p>
              )}
            </div>

            {/* Rating */}
            {showRating && product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-lg',
                        i < product.rating! ? 'text-yellow-400' : 'text-gray-300'
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Pricing */}
            {showPricing && (
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-foreground">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            )}

            {/* Availability */}
            {showAvailability && product.availability && (
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    'w-3 h-3 rounded-full',
                    product.availability === 'in-stock' && 'bg-green-500',
                    product.availability === 'limited' && 'bg-yellow-500',
                    product.availability === 'out-of-stock' && 'bg-red-500'
                  )}
                />
                <span className="text-sm font-medium">
                  {product.availability === 'in-stock' && 'In Stock'}
                  {product.availability === 'limited' && 'Limited Stock'}
                  {product.availability === 'out-of-stock' && 'Out of Stock'}
                </span>
              </div>
            )}
          </>
        )}

        {children}
      </div>
    );
  }
);

ProductDetails.displayName = 'ProductDetails';

// =============================================================================
// CHECKOUT STEPS COMPONENT
// =============================================================================

export const CheckoutSteps = forwardRef<HTMLDivElement, CheckoutStepsProps>(
  (
    {
      steps,
      currentStep,
      size = 'md',
      orientation = 'horizontal',
      onStepClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <nav
        ref={ref}
        className={cn(checkoutStepsVariants({ size, orientation }), className)}
        aria-label="Checkout progress"
        {...props}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = onStepClick && step.status !== 'disabled';

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-center',
                orientation === 'horizontal' && index < steps.length - 1 && 'after:flex-1 after:h-px after:bg-border after:mx-4'
              )}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(stepNumber)}
                disabled={step.status === 'disabled' || !isClickable}
                className={cn(
                  'flex items-center space-x-3 p-2 rounded-lg transition-colors',
                  isClickable && 'hover:bg-secondary/50',
                  step.status === 'disabled' && 'opacity-50 cursor-not-allowed'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isActive && 'border-primary text-primary',
                    !isActive && !isCompleted && 'border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    stepNumber
                  )}
                </div>
                
                <div className="text-left">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isActive && 'text-foreground',
                      !isActive && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>
    );
  }
);

CheckoutSteps.displayName = 'CheckoutSteps';

// =============================================================================
// ORDER SUMMARY COMPONENT
// =============================================================================

export const OrderSummary = forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      items,
      shipping,
      taxes,
      discounts,
      total,
      variant = 'default',
      position = 'sidebar',
      editable = false,
      onItemChange,
      onItemRemove,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing } = useTokens();

    return (
      <div
        ref={ref}
        className={cn(orderSummaryVariants({ variant, position }), className)}
        {...props}
      >
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        {/* Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </h4>
                {item.variant && (
                  <p className="text-xs text-muted-foreground">
                    {item.variant}
                  </p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-2">
                    {editable ? (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onItemChange?.(item.id, Math.max(0, item.quantity - 1))}
                          className="w-6 h-6 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onItemChange?.(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {item.price}
                    </span>
                    {editable && (
                      <button
                        onClick={() => onItemRemove?.(item.id)}
                        className="text-xs text-destructive hover:text-destructive/80"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{total.subtotal}</span>
          </div>

          {shipping && (
            <div className="flex justify-between text-sm">
              <span>Shipping ({shipping.method})</span>
              <span>{shipping.cost}</span>
            </div>
          )}

          {taxes?.map((tax) => (
            <div key={tax.name} className="flex justify-between text-sm">
              <span>{tax.name}</span>
              <span>{tax.amount}</span>
            </div>
          ))}

          {discounts?.map((discount) => (
            <div key={discount.code} className="flex justify-between text-sm text-green-600">
              <span>{discount.name} ({discount.code})</span>
              <span>-{discount.amount}</span>
            </div>
          ))}

          <div className="flex justify-between text-lg font-semibold border-t border-border pt-3">
            <span>Total</span>
            <span>{total.total}</span>
          </div>
        </div>
      </div>
    );
  }
);

OrderSummary.displayName = 'OrderSummary';

// =============================================================================
// INVOICE COMPONENT
// =============================================================================

export const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(
  (
    {
      invoice,
      variant = 'standard',
      printable = true,
      onPrint,
      onDownload,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(invoiceVariants({ variant, printable }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Invoice</h1>
            <p className="text-lg text-muted-foreground">#{invoice.number}</p>
          </div>
          
          <div className="flex space-x-2 print:hidden">
            {onPrint && (
              <button
                onClick={onPrint}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors"
              >
                Print
              </button>
            )}
            {onDownload && (
              <button
                onClick={onDownload}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
              >
                Download
              </button>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">From:</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{invoice.from.name}</p>
              {invoice.from.company && (
                <p>{invoice.from.company}</p>
              )}
              {invoice.from.address.map((line, index) => (
                <p key={index} className="text-muted-foreground">{line}</p>
              ))}
              {invoice.from.email && (
                <p className="text-muted-foreground">{invoice.from.email}</p>
              )}
              {invoice.from.phone && (
                <p className="text-muted-foreground">{invoice.from.phone}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">To:</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{invoice.to.name}</p>
              {invoice.to.company && (
                <p>{invoice.to.company}</p>
              )}
              {invoice.to.address.map((line, index) => (
                <p key={index} className="text-muted-foreground">{line}</p>
              ))}
              {invoice.to.email && (
                <p className="text-muted-foreground">{invoice.to.email}</p>
              )}
              {invoice.to.phone && (
                <p className="text-muted-foreground">{invoice.to.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Invoice Date:</span>
            <p className="text-muted-foreground">{invoice.date}</p>
          </div>
          {invoice.dueDate && (
            <div>
              <span className="font-medium">Due Date:</span>
              <p className="text-muted-foreground">{invoice.dueDate}</p>
            </div>
          )}
          <div>
            <span className="font-medium">Status:</span>
            <p className={cn(
              'font-medium capitalize',
              invoice.status === 'paid' && 'text-green-600',
              invoice.status === 'overdue' && 'text-red-600',
              invoice.status === 'sent' && 'text-blue-600',
              invoice.status === 'draft' && 'text-gray-600'
            )}>
              {invoice.status}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium">Description</th>
                <th className="text-right py-3 font-medium">Qty</th>
                <th className="text-right py-3 font-medium">Unit Price</th>
                <th className="text-right py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{item.unitPrice}</td>
                  <td className="py-3 text-right font-medium">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{invoice.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>{invoice.tax}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
              <span>Total:</span>
              <span>{invoice.total}</span>
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="space-y-4">
            {invoice.notes && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Notes:</h4>
                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Terms:</h4>
                <p className="text-sm text-muted-foreground">{invoice.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Invoice.displayName = 'Invoice';

// =============================================================================
// PRODUCT LAYOUT COMPONENT
// =============================================================================

export const ProductLayout = forwardRef<HTMLDivElement, ProductLayoutProps>(
  (
    {
      children,
      variant = 'standard',
      alignment = 'top',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(productLayoutVariants({ variant, alignment }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ProductLayout.displayName = 'ProductLayout';

// =============================================================================
// MAIN E-COMMERCE LAYOUT COMPONENT
// =============================================================================

export const EcommerceLayout = forwardRef<HTMLDivElement, EcommerceLayoutProps>(
  (
    {
      children,
      layout = 'product',
      spacing = 'normal',
      className,
      'aria-label': ariaLabel = 'E-commerce page',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    return (
      <div
        ref={ref}
        className={cn(ecommerceLayoutVariants({ layout, spacing }), className)}
        style={layoutStyles}
        role="main"
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EcommerceLayout.displayName = 'EcommerceLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

EcommerceLayout.Product = ProductLayout;
EcommerceLayout.ProductGallery = ProductGallery;
EcommerceLayout.ProductDetails = ProductDetails;
EcommerceLayout.CheckoutSteps = CheckoutSteps;
EcommerceLayout.OrderSummary = OrderSummary;
EcommerceLayout.Invoice = Invoice;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type EcommerceLayoutVariant = VariantProps<typeof ecommerceLayoutVariants>;
export type ProductLayoutVariant = VariantProps<typeof productLayoutVariants>;
export type ProductGalleryVariant = VariantProps<typeof productGalleryVariants>;
export type CheckoutStepsVariant = VariantProps<typeof checkoutStepsVariants>;
export type OrderSummaryVariant = VariantProps<typeof orderSummaryVariants>;
export type InvoiceVariant = VariantProps<typeof invoiceVariants>;

export { 
  ecommerceLayoutVariants, 
  productLayoutVariants, 
  productGalleryVariants, 
  checkoutStepsVariants,
  orderSummaryVariants,
  invoiceVariants,
};