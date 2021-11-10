import { createAction } from "@reduxjs/toolkit";

export const accountChanged = createAction<string[]>("wallet/accountChanged");
