import server from "./server";
import localWallet from "./LocalWallet";

function Wallet({ user, setUser, balance, setBalance }) {
  /**
   * On user selection, update the user account balance.
   * @param evt the DOM event containing the selected username.
   */
  async function onSelectUser(evt) {
    const selectedUser = evt.target.value;
    setUser(selectedUser);

    if (selectedUser) {
      const address = localWallet.getAddress(selectedUser);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <select onChange={onSelectUser} value={user}>
          <option value="">--- please choose a user wallet ---</option>
          {localWallet.USERS.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>
      <div className="balance">Address: {localWallet.getAddress(user)}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
