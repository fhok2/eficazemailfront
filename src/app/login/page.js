import Layout from '@/components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHandHoldingUsd, faExchangeAlt, faQrcode } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <Layout>
  

      <div className="lg:flex gap-4 items-stretch">
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <p>Saldo actual</p>
              <h2 className="text-4xl font-bold text-gray-600">50.365</h2>
              <p>25.365 $</p>
            </div>
           
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
          <div className="flex flex-wrap justify-between h-full">
            <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
              <FontAwesomeIcon icon={faHandHoldingUsd} className="text-white text-4xl" />
              <p className="text-white">Depositar</p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
              <FontAwesomeIcon icon={faExchangeAlt} className="text-white text-4xl" />
              <p className="text-white">Transferir</p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
              <FontAwesomeIcon icon={faQrcode} className="text-white text-4xl" />
              <p className="text-white">Canjear</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md my-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b-2 w-full">
                <h2 className="text-ml font-bold text-gray-600">Transacciones</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b w-full">
              <td className="px-4 py-2 text-left align-top w-1/2">
                <div>
                  <h2>Comercio</h2>
                  <p>24/07/2023</p>
                </div>
              </td>
              <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                <p><span>150$</span></p>
              </td>
            </tr>
            <tr className="border-b w-full">
              <td className="px-4 py-2 text-left align-top w-1/2">
                <div>
                  <h2>Comercio</h2>
                  <p>24/06/2023</p>
                </div>
              </td>
              <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                <p><span>15$</span></p>
              </td>
            </tr>
            <tr className="border-b w-full">
              <td className="px-4 py-2 text-left align-top w-1/2">
                <div>
                  <h2>Comercio</h2>
                  <p>02/05/2023</p>
                </div>
              </td>
              <td className="px-4 py-2 text-right text-cyan-500 w-1/2">
                <p><span>50$</span></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

