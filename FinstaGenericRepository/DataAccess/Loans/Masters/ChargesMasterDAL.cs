using FinstaRepository.DataAccess.Settings;
using FinstaRepository.Interfaces.Loans.Masters;
using HelperManager;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using FinstaInfrastructure.Loans.Masters;

namespace FinstaRepository.DataAccess.Loans.Masters
{
    public class ChargesMasterDAL : SettingsDAL, IChargesMaster
    {
        ChargesMasterDTO objcharges = new ChargesMasterDTO();
        NpgsqlConnection con = new NpgsqlConnection(NPGSqlHelper.SQLConnString);
        NpgsqlDataReader dr = null;
        // NpgsqlTransaction trans = null;
        public List<ChargesMasterDTO> lstChargesType { get; set; }
        #region SaveChargeName
        public bool SaveChargesName(ChargesMasterDTO charges, string ConnectionString)
        {
            bool isSaved = false;
            try
            {
                NPGSqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, "insert into TBLMSTCHARGESTYPES(CHARGENAME,statusid,createdby,createddate)values('" + ManageQuote(charges.pCHARGENAME) + "',1,1,current_timestamp);");
                isSaved = true;

            }
            catch (Exception)
            {

                throw;
            }
            return isSaved;
        }
        #endregion
        #region GetChargesName
        public List<ChargesMasterDTO> GetChargesName(string ConnectionString)
        {
            lstChargesType = new List<ChargesMasterDTO>();
            try
            {
                dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select * from TBLMSTCHARGESTYPES where statusid=1");
                while (dr.Read())
                {
                    objcharges.pCHARGENAME = dr["CHARGENAME"].ToString();
                    lstChargesType.Add(objcharges);
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstChargesType; 

        }
        #endregion
        #region SaveLoanWiseChatgeTypes
        public bool SaveLoanWiseChargeTypes(ChargesMasterDTO charges, string ConnectionString)
        {
            bool isSaved = false;
            try
            {              
                con = new NpgsqlConnection(ConnectionString);
                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }
                for (var i = 0; i < charges.pLoanchargetypes.Count; i++)
                {

                    NPGSqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, "insert into TBLMSTLOANWISECHARGESTYPES(LOANTYPEID,LOANID,CHARGEID,CHARGENAME,LEDGERNAME,PARENTGROUPLEDGERNAME,PARENTGROUPLEDGERID,STATUSID,CREATEDBY,CREATEDDATE)values(" + charges.pLoanchargetypes[i].pLOANTYPEID + "," + charges.pLoanchargetypes[i].pLOANTYPEID + "," + charges.pLoanchargetypes[i].pCHARGEID + ",'" + ManageQuote(charges.pLoanchargetypes[i].pCHARGENAME) + "','" + ManageQuote(charges.pLoanchargetypes[i].pLEDGERNAME) + "','" + ManageQuote(charges.pLoanchargetypes[i].pPARENTGROUPLEDGERNAME) + "','" + ManageQuote(charges.pLoanchargetypes[i].pPARENTGROUPLEDGERID) + "',1,1,current_timestamp);");
                }
                isSaved = true;

            }
            catch (Exception)
            {

                throw;
            }
            return isSaved;
        }

        #endregion
        #region GetLoanchargetypes
        public List<ChargesMasterDTO> GetLoanchargetypes(string ConnectionString)
        {
            lstChargesType = new List<ChargesMasterDTO>();
            try
            {
                dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select * from TBLMSTLOANWISECHARGESTYPES where statusid=1");
                while (dr.Read())
                {
                    objcharges.pCHARGENAME = dr["CHARGENAME"].ToString();
                   
                    lstChargesType.Add(objcharges);
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstChargesType;

        }
        #endregion
        #region 
        public bool SaveLoanWiseChargeConfig(ChargesMasterDTO charges, string ConnectionString)
        {
            bool isSaved = false;
            try
            {
                NPGSqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, "insert into TBLMSTLOANWISECHARGESCONFIG(LOANTYPEID,LOANID,LOANCHARGEID,CHARGENAME,LOANPAYIN,TENUREFROM,TENURETO,ISCHARGEAPPLICABLE,ISTAXAPPLICABLE,ISCHARGERANGEAPPLICABLEON,CHARGECALTYPE,CHARGECALONFIELD,CHARGESVALUE,TAXTYPE,TAXVALUE,MINLOANAMOUNT,MAXLOANAMOUNT,MINCHARGEAMOUNTOFPERCENTAGE,MAXCHARGEAMOUNTOFPERCENTAGE,EFFECTFROMDATE,EFFECTTODATE,ISCHARGEWAIVEDOFF,LOCKINGPERIOD,STATUSID,CREATEDBY,CREATEDDATE)values("+charges.pLOANTYPEID+ "," + charges.pLOANID + "," + charges.pLOANCHARGEID + "," +
                    "'" + ManageQuote(charges.pCHARGENAME) + "'," + charges.pLOANPAYIN + "," + charges.pTENUREFROM + "," + charges.pTENURETO + "," + charges.pISCHARGEAPPLICABLE + "," + charges.pISTAXAPPLICABLE + "," + charges.pISCHARGERANGEAPPLICABLEON + "," + charges.pCHARGECALTYPE + "," + charges.pCHARGECALONFIELD + "," + charges.pCHARGESVALUE + "," + charges.pTAXTYPE + "," + charges.pMINLOANAMOUNT + "," + charges.pMAXLOANAMOUNT + "," + charges.pMINCHARGEAMOUNTOFPERCENTAGE + "," + charges.pMAXCHARGEAMOUNTOFPERCENTAGE + "," + charges.pEFFECTFROMDATE + "," + charges.pEFFECTTODATE + "," + charges.pISCHARGEWAIVEDOFF + "," + charges.pLOCKINGPERIOD + ",1,1,current_timestamp);");
                isSaved = true;
            }
            catch (Exception)
            {

                throw;
            }
            return isSaved;
        }
        #endregion 
    }
}
