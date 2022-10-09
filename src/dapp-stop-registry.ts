import {
  Bought,
  DappStopRegistry,
  Registered,
  Updated,
} from "../generated/DappStopRegistry/DappStopRegistry";

import { BigInt } from "@graphprotocol/graph-ts";
import { Dapp } from "../generated/schema";
import { sendEPNSNotification } from "./EPNSNotification";

// export function handleBought(event: Bought): void {}

export function handleRegistered(event: Registered): void {
  let tokenId = event.params.dappId;
  let id = event.address.toHex() + "_" + tokenId.toString();
  let dapp = Dapp.load(id);

  if (!dapp) {
    dapp = new Dapp(id);
  }

  dapp.creator = event.params.dappInfo.creator;
  dapp.dappId = event.params.dappId;
  dapp.popURI = event.params.dappInfo.popURI;
  dapp.ceramicURI = event.params.dappInfo.ceramicURI;
  dapp.price = event.params.dappInfo.price;
  dapp.save();

  let recipient = "0xB0853B57326e08aA536663D6aC78304c0b3E38Da",
    type = "1",
    title = "NEW APP REGISTERED",
    body = `App #${tokenId.toString()} has been registered`,
    subject = "NEW APP REGISTERED",
    message = `App #${tokenId.toString()} has been registered`,
    image = "null",
    secret = "null",
    cta = "https://www.dappstop.xyz/";

  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`;
  sendEPNSNotification(recipient, notification);
}

export function handleUpdated(event: Updated): void {
  let tokenId = event.params.dappId;
  let id = event.address.toHex() + "_" + tokenId.toString();
  let dapp = Dapp.load(id);

  if (!dapp) {
    dapp = new Dapp(id);
  }

  dapp.creator = event.params.dappInfo.creator;
  dapp.dappId = event.params.dappId;
  dapp.popURI = event.params.dappInfo.popURI;
  dapp.ceramicURI = event.params.dappInfo.ceramicURI;
  dapp.price = event.params.dappInfo.price;
  dapp.save();
}

export const subgraphID = "2manslkh/dappstop-mumbai";
