using FinstaInfrastructure.Loans.Masters;
using FinstaRepository.DataAccess.Settings;
using FinstaRepository.Interfaces.Loans.Masters;
using HelperManager;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace FinstaRepository.DataAccess.Loans.Masters
{


    public class LoansMasterDAL : SettingsDAL, ILoansMaster
    {

        NpgsqlConnection con = null;
        NpgsqlTransaction trans = null;
        public List<LoansMasterDTO> lstLoanMasterdetails { get; set; }
        public List<loanconfigurationDTO> loanconfigurationdetails { get; set; }
        public List<instalmentdatedetails> loaninstalmentdatedetails { get; set; }

        public List<loanconfigurationDTO> lstLoanpayins { get; set; }
        public List<loanconfigurationDTO> lstLoanIneterstratetypes { get; set; }
        public List<LoansMasterDTO> getLoanTypes(string ConnectionString)
        {
            lstLoanMasterdetails = new List<LoansMasterDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT loantypeid,loantype from tblmstloantypes"))
                {
                    while (dr.Read())
                    {
                        LoansMasterDTO objamasterdetails = new LoansMasterDTO();
                        objamasterdetails.pLoantype = dr["loantype"].ToString();
                        objamasterdetails.pLoantypeid = Convert.ToInt32(dr["loantypeid"]);
                        lstLoanMasterdetails.Add(objamasterdetails);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstLoanMasterdetails;
        }

        public List<loanconfigurationDTO> getLoanpayins(string ConnectionString)
        {
            lstLoanpayins = new List<loanconfigurationDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select laonpayin from tblmstloanpayin where statusid=1 order by recordid"))
                {
                    while (dr.Read())
                    {
                        loanconfigurationDTO obj = new loanconfigurationDTO();
                        obj.pLoanpayin = dr["laonpayin"].ToString();
                        lstLoanpayins.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstLoanpayins;
        }

        public List<loanconfigurationDTO> getLoanInterestratetypes(string ConnectionString)
        {
            lstLoanIneterstratetypes = new List<loanconfigurationDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select interestratetype from tblmstinterestratetypes where statusid = 1 order by recordid"))
                {
                    while (dr.Read())
                    {
                        loanconfigurationDTO obj = new loanconfigurationDTO();
                        obj.pInteresttype = dr["interestratetype"].ToString();
                        lstLoanIneterstratetypes.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstLoanIneterstratetypes;
        }

        public List<loanconfigurationDTO> getLoanconfigurationDetails(string ConnectionString, Int64 loanid)
        {
            loanconfigurationdetails = new List<loanconfigurationDTO>();
            try
            {

                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select loanconfigid, loantype, loanname, loancode, LOANIDCODE,tl.loanid, applicanttype, contacttype, loanpayin, minloanamount, maxloanamount, tenurefrom, tenureto, interesttype, rateofinterest, effectfromdate, statusname from tblmstloantypes tt join tblmstloans tl on tt.loantypeid = tl.loantypeid join TBLMSTLOANCONFIGURATION tc on tl.loanid = tc.loanid join tblmststatus ts on tl.statusid = ts.statusid where tc.loanid=" + loanid + " order by loantype, loanname; "))
                {
                    while (dr.Read())
                    {
                        loanconfigurationDTO objamasterdetails = new loanconfigurationDTO();
                        objamasterdetails.pLoanconfigid = Convert.ToInt64(dr["loanconfigid"]);
                        objamasterdetails.pLoanid = Convert.ToInt64(dr["loanid"]);
                        objamasterdetails.pContacttype = dr["contacttype"].ToString();
                        objamasterdetails.pApplicanttype = dr["applicanttype"].ToString();
                        objamasterdetails.pLoanpayin = dr["loanpayin"].ToString();
                        objamasterdetails.pMinloanamount = Convert.ToDecimal(dr["minloanamount"]);
                        objamasterdetails.pMaxloanamount = Convert.ToDecimal(dr["maxloanamount"]);
                        objamasterdetails.pTenurefrom = Convert.ToInt64(dr["tenurefrom"]);
                        objamasterdetails.pTenurefrom = Convert.ToInt64(dr["tenurefrom"]);
                        objamasterdetails.pInteresttype = dr["interesttype"].ToString();
                        objamasterdetails.pMinloanamount = Convert.ToDecimal(dr["rateofinterest"]);
                        objamasterdetails.pEffectfromdate = Convert.ToDateTime(dr["effectfromdate"]);
                        loanconfigurationdetails.Add(objamasterdetails);
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return loanconfigurationdetails;
        }

        public List<instalmentdatedetails> getinstalmentsdateslist(string ConnectionString, Int64 Loanid)
        {
            loaninstalmentdatedetails = new List<instalmentdatedetails>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select * from TBLMSTLOANINSTALLMENTDATECONFIG where loanid=" + Loanid + " "))
                {
                    while (dr.Read())
                    {
                        instalmentdatedetails objinstalmentsdateslist = new instalmentdatedetails();
                        // objinstalmentsdateslis.pLoantypeid = Convert.ToInt32(dr["loantypeid"]);
                        objinstalmentsdateslist.pTypeofInstalmentDay = dr["typeofinstallmentday"].ToString();
                        objinstalmentsdateslist.pDisbursefromday = Convert.ToInt32(dr["disbursefromday"]);
                        objinstalmentsdateslist.pDisbursetoday = Convert.ToInt32(dr["Disbursetoday"]);
                        objinstalmentsdateslist.pInstalmentdueday = Convert.ToInt32(dr["installmentdueday"]);
                        objinstalmentsdateslist.pInstalmentdueday = Convert.ToInt32(dr["installmentdueday"]);
                        loaninstalmentdatedetails.Add(objinstalmentsdateslist);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return loaninstalmentdatedetails;
        }

        public List<LoansMasterDTO> getLoanMasterDetails(string ConnectionString)
        {
            lstLoanMasterdetails = new List<LoansMasterDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select tt.loantypeid,loanid, loantype,loanname,loancode,companycode,branchcode,series,serieslength,loanidcode,statusname from tblmstloantypes tt join tblmstloans  tl on tt.loantypeid = tl.loantypeid join tblmststatus ts on tl.statusid = ts.statusid order by loantype, loanname;"))
                {
                    while (dr.Read())
                    {
                        LoansMasterDTO objamasterdetails = new LoansMasterDTO();
                        objamasterdetails.pLoantypeid = Convert.ToInt32(dr["loantypeid"]);
                        objamasterdetails.pCompanycode = dr["companycode"].ToString();
                        objamasterdetails.pBranchcode = dr["branchcode"].ToString();
                        objamasterdetails.pSeries = dr["series"].ToString();
                        objamasterdetails.pSerieslength = Convert.ToInt32(dr["serieslength"]);

                        objamasterdetails.pLoanid = Convert.ToInt64(dr["loanid"]);
                        objamasterdetails.pLoantype = dr["loantype"].ToString();
                        objamasterdetails.pLoanname = dr["loanname"].ToString();
                        objamasterdetails.pLoancode = dr["loancode"].ToString();
                        objamasterdetails.pLoanidcode = dr["loanidcode"].ToString();
                        objamasterdetails.pStatusname = dr["statusname"].ToString();
                        objamasterdetails.loanconfigurationlist = getLoanconfigurationDetails(ConnectionString, objamasterdetails.pLoanid);
                        objamasterdetails.instalmentdatedetailslist = getinstalmentsdateslist(ConnectionString, objamasterdetails.pLoanid);
                        lstLoanMasterdetails.Add(objamasterdetails);
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstLoanMasterdetails;
        }



        public int checkInsertLoanNameandCodeDuplicates(string checkparamtype, string loanname, string loancode, string connectionstring)
        {
            int count = 0;
            try
            {
                if (checkparamtype.ToUpper() == "LOANNAME")
                {
                    count = Convert.ToInt32(NPGSqlHelper.ExecuteScalar(connectionstring, CommandType.Text, "select count(*) from tblmstloans where loanname='" + ManageQuote(loanname) + "'"));
                }
                else
                {
                    count = Convert.ToInt32(NPGSqlHelper.ExecuteScalar(connectionstring, CommandType.Text, "select count(*) from tblmstloans where loancode='" + ManageQuote(loancode) + "'"));
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return count;

        }
        public bool saveLoanMaster(LoansMasterDTO loanmasterlist, string connectionstring)
        {
            bool isSaved = false;

            long loanid;
            try
            {
                con = new NpgsqlConnection(connectionstring);
                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }
                trans = con.BeginTransaction();
                loanid = Convert.ToInt64(NPGSqlHelper.ExecuteScalar(trans, CommandType.Text, "insert into tblmstloans(loantypeid,loanname,loancode,companycode,branchcode,series,serieslength,loanidcode,statusid,createdby,createddate)values(" + loanmasterlist.pLoantypeid + ",'" + ManageQuote(loanmasterlist.pLoanname) + "','" + ManageQuote(loanmasterlist.pLoancode) + "','" + ManageQuote(loanmasterlist.pCompanycode) + "','" + ManageQuote(loanmasterlist.pBranchcode) + "','" + ManageQuote(loanmasterlist.pSeries) + "'," + loanmasterlist.pSerieslength + ",'" + ManageQuote(loanmasterlist.pLoanidcode) + "'," + loanmasterlist.pStatusid + "," + loanmasterlist.pCreatedby + ",current_timestamp) returning loanid"));

                if (loanmasterlist.loanconfigurationlist != null)
                {
                    for (int i = 0; i < loanmasterlist.loanconfigurationlist.Count; i++)
                    {
                        string query = "insert into tblmstloanconfiguration(loantypeid, loanid, contacttype, applicanttype, loanpayin, minloanamount, maxloanamount, tenurefrom, tenureto, interesttype, rateofinterest, effectfromdate, effecttodate, statusid, createdby, createddate)values(" + loanmasterlist.pLoantypeid + "," + loanid + ",'" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pContacttype) + "','" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pApplicanttype) + "','" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pLoanpayin) + "'," + loanmasterlist.loanconfigurationlist[i].pMinloanamount + "," + loanmasterlist.loanconfigurationlist[i].pMaxloanamount + "," + loanmasterlist.loanconfigurationlist[i].pTenurefrom + "," + loanmasterlist.loanconfigurationlist[i].pTenureto + ",'" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pInteresttype) + "'," + loanmasterlist.loanconfigurationlist[i].pRateofinterest + ",'" + FormatDate(loanmasterlist.loanconfigurationlist[i].pEffectfromdate.ToString()) + "','" + FormatDate(loanmasterlist.loanconfigurationlist[i].pEffecttodate.ToString()) + "'," + loanmasterlist.pStatusid + "," + loanmasterlist.loanconfigurationlist[i].pCreatedby + ",current_timestamp);";
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, query);
                    }
                }

                if (loanmasterlist.instalmentdatedetailslist != null)
                {
                    for (int i = 0; i < loanmasterlist.instalmentdatedetailslist.Count; i++)
                    {
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "insert into TBLMSTLOANINSTALLMENTDATECONFIG(loantypeid,loanid,typeofinstallmentday,disbursefromday,disbursetoday,installmentdueday,statusid,createdby,createddate)values('" + loanmasterlist.instalmentdatedetailslist[i].pLoantypeId + "'," + loanid + ",'" + ManageQuote(loanmasterlist.instalmentdatedetailslist[i].pTypeofInstalmentDay) + "'," + loanmasterlist.instalmentdatedetailslist[i].pDisbursefromday + "," + loanmasterlist.instalmentdatedetailslist[i].pDisbursetoday + "," + loanmasterlist.instalmentdatedetailslist[i].pInstalmentdueday + "," + loanmasterlist.pStatusid + "," + loanmasterlist.loanconfigurationlist[i].pCreatedby + ",current_timestamp);");

                    }
                }
                if (loanmasterlist.identificationdocumentsList != null)
                {
                    for (int i = 0; i < loanmasterlist.identificationdocumentsList.Count; i++)
                    {
                        if(loanmasterlist.identificationdocumentsList[i].pDocumentRequired==true || loanmasterlist.identificationdocumentsList[i].pDocumentMandatory == true)
                        {
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "insert into tblmstloanwisedocumentproofs(loantypeid,loanid,contacttype,documentid,documentgroupid,isdocumentrequired,isdocumentmandatory,statusid,createdby,createddate) values(" + loanmasterlist.pLoantypeid + "," + loanid + ",'" + ManageQuote(loanmasterlist.identificationdocumentsList[i].pContactType) + "'," + loanmasterlist.identificationdocumentsList[i].pDocumentId + "," + loanmasterlist.identificationdocumentsList[i].pDocumentgroupId + ",'" + loanmasterlist.identificationdocumentsList[i].pDocumentRequired + "','" + loanmasterlist.identificationdocumentsList[i].pDocumentMandatory + "'," + loanmasterlist.pStatusid + "," + loanmasterlist.pCreatedby + ",current_timestamp);");
                        }
                       
                    }
                }
                trans.Commit();
                isSaved = true;
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Dispose();
                    con.Close();
                    con.ClearPool();
                    trans.Dispose();
                }
            }
            return isSaved;
        }

        public bool updateLoanMaster(LoansMasterDTO loanmasterlist, string connectionstring)
        {
            bool isSaved = false;
            StringBuilder sbupdate = new StringBuilder();
            try
            {
                con = new NpgsqlConnection(connectionstring);
                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }
                trans = con.BeginTransaction();
                if (loanmasterlist != null)
                {
                    sbupdate.Append("UPDATE tblmstloans set loanname ='" + ManageQuote(loanmasterlist.pLoanname) + "',loancode='" + ManageQuote(loanmasterlist.pLoancode) + "',statusid=getStatusid('" + loanmasterlist.pStatusname + "','" + connectionstring + "'),modifiedby=" + loanmasterlist.pModifiedby + ",modifieddate=current_timestamp where loanid=" + loanmasterlist.pLoanid + "; ");
                }

                if (loanmasterlist.loanconfigurationlist != null)
                {

                    for (int i = 0; i < loanmasterlist.loanconfigurationlist.Count; i++)
                    {
                        if (loanmasterlist.loanconfigurationlist[i].ptypeofoperation == "UPDATE")
                        {
                            sbupdate.Append("UPDATE tblmstloanconfiguration set applicanttype ='" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pApplicanttype) + "',loanpayin='" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pLoanpayin) + "',minloanamount=" + loanmasterlist.loanconfigurationlist[i].pMinloanamount + ",maxloanamount=" + loanmasterlist.loanconfigurationlist[i].pMaxloanamount + ",tenurefrom=" + loanmasterlist.loanconfigurationlist[i].pTenurefrom + ",tenureto=" + loanmasterlist.loanconfigurationlist[i].pTenureto + ",interesttype='" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pInteresttype) + "',rateofinterest=" + loanmasterlist.loanconfigurationlist[i].pRateofinterest + ",effectfromdate='" + loanmasterlist.loanconfigurationlist[i].pEffectfromdate + "',modifiedby=" + loanmasterlist.loanconfigurationlist[i].pModifiedby + ",modifieddate=current_timestamp where loanconfigid=" + loanmasterlist.loanconfigurationlist[i].pLoanconfigid + " and loanid=" + loanmasterlist.pLoanid + ";");
                        }
                        else if (loanmasterlist.loanconfigurationlist[i].ptypeofoperation == "CREATE")
                        {
                            sbupdate.Append("insert into tblmstloanconfiguration(loantypeid, loanid, contacttype, applicanttype, loanpayin, minloanamount, maxloanamount, tenurefrom, tenureto, interesttype, rateofinterest, effectfromdate, effecttodate, statusid, createdby, createddate)values((" + loanmasterlist.loanconfigurationlist[i].pLoantypeId + "," + loanmasterlist.loanconfigurationlist[i].pLoanid + ",'" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pContacttype) + "','" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pApplicanttype) + "','" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pLoanpayin) + "'," + loanmasterlist.loanconfigurationlist[i].pMinloanamount + "," + loanmasterlist.loanconfigurationlist[i].pMaxloanamount + "," + loanmasterlist.loanconfigurationlist[i].pTenurefrom + "," + loanmasterlist.loanconfigurationlist[i].pTenureto + ",'" + ManageQuote(loanmasterlist.loanconfigurationlist[i].pInteresttype) + "'," + loanmasterlist.loanconfigurationlist[i].pRateofinterest + "," + loanmasterlist.loanconfigurationlist[i].pEffectfromdate + "," + loanmasterlist.loanconfigurationlist[i].pEffecttodate + "," + loanmasterlist.loanconfigurationlist[i].pStatusid + "," + loanmasterlist.loanconfigurationlist[i].pCreatedby + ",current_timestamp);");
                        }
                        else if (loanmasterlist.loanconfigurationlist[i].ptypeofoperation == "DELETE")
                        {
                            sbupdate.Append("update tblmstloanconfiguration set statusid=getStatusid('" + loanmasterlist.loanconfigurationlist[i].pStatusname + "','" + connectionstring + "'),modifiedby=" + loanmasterlist.loanconfigurationlist[i].pModifiedby + ",modifieddate=current_timestamp where loanid=" + loanmasterlist.pLoanid + " and loanconfigid=" + loanmasterlist.loanconfigurationlist[i].pLoanconfigid + ";");
                        }
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, sbupdate.ToString());
                        trans.Commit();
                        isSaved = true;
                    }
                }

                if (loanmasterlist.instalmentdatedetailslist != null)
                {
                    if (loanmasterlist.instalmentdatedetailslist.Count > 0)
                    {
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "delete from TBLMSTLOANINSTALLMENTDATECONFIG where typeofinstallmentday='" + loanmasterlist.instalmentdatedetailslist[0].pTypeofInstalmentDay + "'");
                        for (var i = 0; i < loanmasterlist.instalmentdatedetailslist.Count; i++)
                        {
                            NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "insert into TBLMSTLOANINSTALLMENTDATECONFIG(loantypeid,loanid,typeofinstallmentday,disbursefromday,disbursetoday,instalmentdueday,statusid,createdby,createddate))values('" + loanmasterlist.instalmentdatedetailslist[i].pLoantypeId + "'," + loanmasterlist.instalmentdatedetailslist[i].pLoanid + ",'" + ManageQuote(loanmasterlist.instalmentdatedetailslist[i].pTypeofInstalmentDay) + "'," + loanmasterlist.instalmentdatedetailslist[i].pDisbursefromday + "," + loanmasterlist.instalmentdatedetailslist[i].pDisbursetoday + "," + loanmasterlist.instalmentdatedetailslist[i].pInstalmentdueday + "," + loanmasterlist.instalmentdatedetailslist[i].pCreatedby + ",1,current_timestamp);");

                        }
                    }
                }
                if (loanmasterlist.identificationdocumentsList != null)
                {
                    if (loanmasterlist.identificationdocumentsList.Count > 0)
                    {
                        NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "delete from  tblmstloanwisedocumentproofs where loanid=" + loanmasterlist.pLoanid + "");

                        for (int i = 0; i < loanmasterlist.identificationdocumentsList.Count; i++)
                        {
                            NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, "insert into tblmstloanwisedocumentproofs(loantypeid,loanid,contacttype,documentid,documentgroupid,isdocumentrequired,isdocumentmandatory,statusid,createdby,createddate) values(" + loanmasterlist.pLoantypeid + "," + loanmasterlist.pLoanid + ",'" + ManageQuote(loanmasterlist.identificationdocumentsList[i].pContactType) + "'," + loanmasterlist.identificationdocumentsList[i].pDocumentId + "," + loanmasterlist.identificationdocumentsList[i].pDocumentgroupId + ",'" + loanmasterlist.identificationdocumentsList[i].pDocumentRequired + "','" + loanmasterlist.identificationdocumentsList[i].pDocumentMandatory + "'," + loanmasterlist.pStatusid + "," + loanmasterlist.pCreatedby + ",current_timestamp);");
                        }
                    }
                }

                trans.Commit();
                isSaved = true;
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Dispose();
                    con.Close();
                    con.ClearPool();
                    trans.Dispose();
                }
            }
            return isSaved;
        }

        public bool DeleteLoanMaster(Int64 loanid, int modifiedby, string connectionstring)
        {
            bool isSaved = false;
            StringBuilder sbupdate = new StringBuilder();
            try
            {
                con = new NpgsqlConnection(connectionstring);
                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }
                trans = con.BeginTransaction();

                sbupdate.Append("UPDATE tblmstloans set statusid=2,modifiedby=" + modifiedby + ",modifieddate=current_timestamp where loanid=" + loanid + "; ");
                sbupdate.Append("UPDATE tblmstloanconfiguration set statusid=2,modifiedby=" + modifiedby + ",modifieddate=current_timestamp where loanid=" + loanid + "; ");
                sbupdate.Append("UPDATE tblmstloaninstallmentdateconfig set statusid=2,modifiedby=" + modifiedby + ",modifieddate=current_timestamp where loanid=" + loanid + "; ");
                sbupdate.Append("UPDATE tblmstloanwisedocumentproofs set statusid=2,modifiedby=" + modifiedby + ",modifieddate=current_timestamp where loanid=" + loanid + "; ");
                NPGSqlHelper.ExecuteNonQuery(trans, CommandType.Text, sbupdate.ToString());
                trans.Commit();
                isSaved = true;
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Dispose();
                    con.Close();
                    con.ClearPool();
                    trans.Dispose();
                }
            }
            return isSaved;
        }

    }
}







