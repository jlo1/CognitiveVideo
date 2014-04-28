'This goes in the HEAD of the html file:'

<!-- LINK DESCRIPTION TOOLTIP -->

<!-- This goes into the HEAD of the html file -->

<script language="JavaScript" type="text/javascript">

function getDesc(tip) {
 if (document.getElementById) {
  document.getElementById("tipArea").innerHTML = '<center><font color="#000000" face="ms sans serif, verdana, arial, helvetica, sans-serif" size="1">' + tip + '</font></center>' }
 }
//-->
</script>

'This goes in the BODY of the html file:'
<table border="0" align="center" cellspacing="0" cellpadding="0">
 <tr>
  <td width="181">
   <a href="link1.html"
    onMouseOver="getDesc('1. The link description text goes here.');">
   <img src="images/img1.gif" /></a><br /><br />

   <a href="link2.html"
    onMouseOver="getDesc('2. The link description text goes here.');">
   <img src="images/img2.gif" /></a><br /><br />

   <a href="link3.html"
    onMouseOver="getDesc('3. The link description text goes here.');">
   <img src="images/img3.gif" /></a><br /><br />

   <a href="link4.html"
    onMouseOver="getDesc('4. The link description text goes here.');">
   <font size="2">Link 4</font></a><br /><br />
  </td>
  <td width="220" align="center" valign="top">
     <ilayer id="tipArea1" width="220" height="190">
     <layer id="tipArea1" width="220" height="190">
     <div id="tipArea">
      <p>
       <font face="verdana, arial, helvetica, sans-serif" size="2" color="#000000"><center>
         Change the text here to suit your own needs.
       </center></font>
      </p>
     </div>
     </layer>
     </ilayer>
  </td>
 </tr>
</table>

