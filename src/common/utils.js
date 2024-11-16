// hash shortening
export function shortenAddress(address) {
  return address === '' ? '' : `${address.slice(0, 6)}...${address.slice(38, 42)}`;
}

export function numberWithCommas(x) {
  if (x === null) return 0;
  const [int, dec] = x.toString().split('.');
  return (
    int && int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec ? '.' + dec : '')
  );
}

export function makeBatchRequest(web3, calls) {
  let batch = new web3.BatchRequest();

  let promises = calls.map((call) => {
    return new Promise((res, rej) => {
      let req = call.request({}, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
      batch.add(req);
    });
  });
  batch.execute();

  return Promise.all(promises);
}

export function isDisabled(id) {
  const intId = parseInt(id);
  return intId.toString() !== id || intId > 10000 || intId < 0;
}

export function isSmallValue(number) {
  const intNumber = parseInt(number);
  return intNumber.toString() !== number || number <= 0;
}
