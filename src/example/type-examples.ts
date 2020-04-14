import ItemId from '../item-id';
import OrderId from '../order-id';
import UserAccountId from '../user-account-id';

class UserService {
  private _userApiService: UserApiService = new UserApiService();

  constructor() {}

  public getUserAccountId(): UserAccountId {
    return this._userApiService.getUserAccountId();
  }
}

class UserApiService {
  constructor() {}

  public getUserAccountId(): UserAccountId {
    const response = ApiRequest.mockRequest(new UserAccountId('12345').value);

    const userAccountParsed = UserAccountId.tryParse(response);
    if (userAccountParsed.parsed) {
      return userAccountParsed.result;
    }

    throw new Error('Api did not return proper user account id type');
  }
}

class OrderService {
  private _orderApiService: OrderApiService = new OrderApiService();
  constructor() {}

  public amendOrder(userAccountId: UserAccountId, orderId: OrderId): OrderId {
    return this._orderApiService.amendOrder(userAccountId, orderId);
  }

  public getOrderItemUserAccountId(
    userAccountId: UserAccountId,
    itemId: ItemId,
    orderId: OrderId
  ): OrderId {
    return this._orderApiService.getOrderItemUserAccountId(
      userAccountId,
      itemId,
      orderId
    );
  }
}

class OrderApiService {
  constructor() {}

  public amendOrder(userAccountId: UserAccountId, orderId: OrderId): OrderId {
    const response = ApiRequest.mockRequest({
      userAccountId: userAccountId.value,
      orderId: orderId.value,
    });

    const orderIdParsed = OrderId.tryParse(response.orderId);
    if (orderIdParsed.parsed) {
      return orderIdParsed.result;
    }

    throw new Error('Api did not return proper user account id type');
  }

  public getOrderItemUserAccountId(
    userAccountId: UserAccountId,
    itemId: ItemId,
    orderId: OrderId
  ): OrderId {
    const response = ApiRequest.mockRequest({
      userAccountId: userAccountId.value,
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

  const wellKnownOrderId = new OrderId('92b7c347-f7bc-4d26-ab47-88ab97981d84');

  const userAccountId = userService.getUserAccountId();
  console.log(userAccountId);

  const createdOrderId = orderService.amendOrder(
    userAccountId,
    wellKnownOrderId
  );
  console.log(createdOrderId);

  const getOrderItemUserAccountId = orderService.getOrderItemUserAccountId(
    userAccountId,
    new ItemId('eab882db-eEc1-4c67-aa1c-ca10f09ed2f1'),
    wellKnownOrderId
  );

  console.log(getOrderItemUserAccountId);

  console.log(new OrderId('92b882db-eEc1-4c67-aa1c-ca10f09ed2f1'));
};

example();
