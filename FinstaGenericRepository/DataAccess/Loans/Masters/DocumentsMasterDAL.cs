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
    public class DocumentsMasterDAL : SettingsDAL, IDocumentsMaster
    {
        NpgsqlDataReader dr = null;
        NpgsqlDataReader dr1 = null;


        #region SaveDocumentionGroup
        public bool SaveDocumentGroup(DocumentsMasterDTO Documents, string ConnectionString)
        {
            bool isSaved = false;
            try
            {
                NPGSqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, "insert into tblmstdocumentgroup(documentgroupname,statusid,createdby,createddate)values('" + ManageQuote(Documents.pDocumentGroup) + "',"+ getStatusid(Documents.pStatusname, ConnectionString) + ","+ Documents .pCreatedby+ ",current_timestamp);");
                isSaved = true;
            }
            catch (Exception)
            {

                throw;
            }
            return isSaved;
        }
        #endregion

        #region SaveIdentificationDocumention 
        public bool SaveIdentificationDocuments(DocumentsMasterDTO Documents, string ConnectionString)
        {
            bool isSaved = false;
            try
            {
                NPGSqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, "insert into tblmstdocumentproofs(documentgroupid,documentgroupname,documentname,statusid,createdby,createddate)values(" + Documents.pDocumentGroupId + ",'" + ManageQuote(Documents.pDocumentGroup) + "','" + ManageQuote(Documents.pDocumentName) + "',"+ getStatusid(Documents.pStatusname, ConnectionString) + ","+ Documents .pCreatedby+ ",current_timestamp);");
                isSaved = true;
            }
            catch (Exception)
            {

                throw;
            }
            return isSaved;
        }
        #endregion

        #region Getdocumentidprofftypes
        public List<DocumentsMasterDTO> Getdocumentidprofftypes(string ConnectionString, LoanIdDTO Documents)
        {
            List<DocumentsMasterDTO> lstdocumentidprofftypes = new List<DocumentsMasterDTO>();
            try
            {
                dr1 = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select documentgroupid,documentgroupname from tblmstdocumentgroup");
                if (Documents.pLoanId> 0)
                {
                    
                    dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select '' as contacttype,documentid,documentgroupid,documentgroupname,documentname,'false'::BOOLEAN as mandatory,'false'::BOOLEAN as required from tblmstdocumentproofs where statusid=1 and documentid not in(select documentid from tblmstloanwisedocumentproofs where statusid=1 and  loanid=" + Documents.pLoanId + ") union select y.contacttype,x.documentid,x.documentgroupid,x.documentgroupname,x.documentname,y.isdocumentrequired as mandatory,y.isdocumentrequired required from tblmstdocumentproofs x right join tblmstloanwisedocumentproofs y on x.documentid = y.documentid where y.statusid = 1 and y.loanid = " + Documents.pLoanId + ";");
                }
                else
                {

                    dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select '' as contacttype,documentid,documentgroupid,documentgroupname,documentname,'false'::BOOLEAN as mandatory,'false'::BOOLEAN as required from tblmstdocumentproofs where statusid=1");
                }
                while (dr1.Read())
                {
                    DocumentsMasterDTO objdocumentidproofs = new DocumentsMasterDTO();
                    objdocumentidproofs.pDocumentGroupId = Convert.ToInt64(dr1["documentgroupid"]);
                    objdocumentidproofs.pDocumentGroup = dr1["documentgroupname"].ToString();
                    objdocumentidproofs.pDocumentsList = new List<pIdentificationDocumentsDTO>();
                    while (dr.Read())
                    {

                        if (dr1["documentgroupname"].ToString() == dr["documentgroupname"].ToString())
                        {
                            objdocumentidproofs.pDocumentsList.Add(new pIdentificationDocumentsDTO {

                               pContactType= dr["contacttype"].ToString(),

                                pDocumentId =Convert.ToInt64(dr["documentid"]), pDocumentName = dr["documentname"].ToString(),
                                pDocumentMandatory = Convert.ToBoolean(dr["mandatory"]),
                                pDocumentRequired = Convert.ToBoolean(dr["required"]) ,pDocumentgroupId= Convert.ToInt64(dr["documentgroupid"]),
                                pLoantypeId=Documents.pLoanId
                            });
                        }
                    }
                    lstdocumentidprofftypes.Add(objdocumentidproofs);
                }             
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstdocumentidprofftypes;
        }
        #endregion

        #region GetDocumentGroup

        public List<DocumentsMasterDTO> GetDocumentGroupNames(string ConnectionString)
        {
            List<DocumentsMasterDTO> lstdocumentGroups = new List<DocumentsMasterDTO>();

            try
            {
                dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select documentgroupid,documentgroupname from tblmstdocumentgroup");
                while (dr.Read())
                {
                    DocumentsMasterDTO objGroupNames = new DocumentsMasterDTO();
                    objGroupNames.pDocumentGroupId = Convert.ToInt32(dr["documentgroupid"]);
                    objGroupNames.pDocumentGroup = dr["documentgroupname"].ToString();
                    lstdocumentGroups.Add(objGroupNames);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstdocumentGroups;
        }
        #endregion

    }
}
