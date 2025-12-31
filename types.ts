
export interface Domain {
  name: string;
  tld: string;
  available: boolean;
  price: number;
  isPremium?: boolean;
  renewalPrice: number;
  reason?: string;
}

export interface OwnedDomain extends Domain {
  id: string;
  registeredAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'pending';
  autoRenew: boolean;
}

export interface CartItem extends Domain {}

export interface UserState {
  ownedDomains: OwnedDomain[];
  cart: CartItem[];
}
