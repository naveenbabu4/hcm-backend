import { UserService } from '../../../src/core/services/user-service';
import { IUserStorage } from '../../../src/core/storage/user-storage';
import { UserAttr, Roles, Status } from '../../../src/core/models/user';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const userTest: UserAttr = {
    firstName: "naveen",
    lastName: "bahunadham",
    email: "bsa.naveenbabu@gmail.com",
    password: "naveen@123",
    role: Roles.Admin,
    status: Status.Active,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
}

describe("UserService", () => {
  let userService: UserService;
  let mockUserStorage: jest.Mocked<IUserStorage>;

  beforeEach(() => {
    // Create a mock for the IUserStorage interface
    mockUserStorage = {
      addUser: jest.fn(),
    } as unknown as jest.Mocked<IUserStorage>;

    // Initialize the UserService with the mock
    userService = new UserService(mockUserStorage);
  });

  it("should add a user successfully", async () => {
    // Arrange: Mock the behavior of addUser
    mockUserStorage.addUser.mockResolvedValue(userTest);

    // Act: Call the service method
    const result = await userService.addUser(userTest);

    // Assert: Verify the outcome
    expect(result).toEqual(userTest);
    expect(mockUserStorage.addUser).toHaveBeenCalledTimes(1);
    expect(mockUserStorage.addUser).toHaveBeenCalledWith(userTest);
  });

  it("should throw an error if adding a user fails", async () => {
    // Arrange: Mock the behavior of addUser to throw an error
    const error = new Error("Database error");
    mockUserStorage.addUser.mockRejectedValue(error);

    // Act & Assert: Ensure the service method throws an error
    await expect(userService.addUser(userTest)).rejects.toThrow("Database error");
    expect(mockUserStorage.addUser).toHaveBeenCalledTimes(1);
    expect(mockUserStorage.addUser).toHaveBeenCalledWith(userTest);
  });
});
