import {
  Bought,
  DappStopRegistry,
  Registered,
  Updated,
} from "../generated/DappStopRegistry/DappStopRegistry";

import { BigInt } from "@graphprotocol/graph-ts";
import { Dapp } from "../generated/schema";

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
