
export async function createOrder(orderData: any, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create order');
  }

  return response.json();
}

export async function getOrders(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/orders/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return response.json();
} 