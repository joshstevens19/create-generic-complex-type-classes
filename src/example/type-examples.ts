class UserService {
  private _userApiService: UserApiService = new UserApiService();

  constructor() {}

  public getUserAccountId(): string {
    return this._userApiService.getUserAccountId();
  }
}

class UserApiService {
  constructor() {}

  public getUserAccountId(): string {
    const response = ApiRequest.mockRequest('12345');

    return response;
  }
}

class OrderService {
  private _orderApiService: OrderApiService = new OrderApiService();
  constructor() {}

  public amendOrder(userAccountId: string, orderId: string): string {
    return this._orderApiService.amendOrder(userAccountId, orderId);
  }

  public getOrderItemUserAccountId(
    userAccountId: string,
    itemId: string,
    orderId: string
  ): string {
    return this._orderApiService.getOrderItemUserAccountId(
      userAccountId,
      itemId,
      orderId
    );
  }
}

class OrderApiService {
  constructor() {}

  public amendOrder(userAccountId: string, orderId: string): string {
    const response = ApiRequest.mockRequest({
      userAccountId,
      orderId,
    });

    return response.orderId;
  }

  public getOrderItemUserAccountId(
    userAccountId: string,
    itemId: string,
    orderId: string
  ): string {
    const response = ApiRequest.mockRequest({
      userAccountId,
      itemId,
      orderId,
    });
    return response.orderId;
  }
}

/**
 * Everything goes through this mock api request just to show example
 * This would be request or ajax or whatever you choice to do the http request
 */
class ApiRequest {
  public static mockRequest<T>(request: T): T {
    return request;
  }
}

const example = () => {
  const userService = new UserService();
  const orderService = new OrderService();

  const wellKnownOrderId = '92b7c347-f7bc-4d26-ab47-88ab97981d84';

  const userAccountId = userService.getUserAccountId();
  console.log(userAccountId);

  const createdOrderId = orderService.amendOrder(
    userAccountId,
    wellKnownOrderId
  );
  console.log(createdOrderId);

  const getOrderItemUserAccountId = orderService.getOrderItemUserAccountId(
    userAccountId,
    'eab882db-eEc1-4c67-aa1c-ca10f09ed2f1',
    wellKnownOrderId
  );

  console.log(getOrderItemUserAccountId);

  console.log('92b882db-eEc1-4c67-aa1c-ca10f09ed2f1');
};

example();
