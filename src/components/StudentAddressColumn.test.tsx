import React from "react";
import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from "@testing-library/react";
import { StudentAddressColumn } from "./StudentAddressColumn";
import { useEditAddress } from "../mutations/useEditAddress";
import { QueryClient, QueryClientProvider } from "react-query";
jest.mock("../mutations/useEditAddress", () => ({
  useEditAddress: jest.fn(),
}));

describe("Header", () => {
  let component: RenderResult;
  const id = "1";
  const address = {
    id: "111",
    line1: "1234 Tracy Ave",
    line2: "3A",
    city: "Kansas City",
    state: "MO",
    zip: 64110,
  };
  let mutateMock: jest.Mock;

  beforeEach(() => {
    mutateMock = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isSuccess: true,
    });
    const queryClient = new QueryClient();
    component = render(
      <QueryClientProvider client={queryClient}>
        <StudentAddressColumn
          id={id}
          address={address}
          addressLoading={false}
        />
      </QueryClientProvider>
    );
  });

  it("should render component as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("should show the edit form when edit button is selected", () => {
    expect(screen.queryByTestId("form-box")).toBeFalsy();
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByTestId("form-box")).toBeDefined();
  });

  it("should call edit address mutation with correct form data when submit button is pressed", () => {
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByText("Save"));
    expect(mutateMock).toBeCalledWith(address);
  });
});
