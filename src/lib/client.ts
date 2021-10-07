import { SessionServiceClient } from "./generated/v1/ServicesServiceClientPb";
import { lazy } from "./util";

export const CLIENT: SessionServiceClient = new SessionServiceClient("api.picapica.org");

export const getSessionClient = lazy(() => new SessionServiceClient("foo.test"));
