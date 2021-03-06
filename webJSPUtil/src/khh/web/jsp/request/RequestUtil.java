package khh.web.jsp.request;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import khh.std.adapter.AdapterMap;
import khh.string.util.StringUtil;

public class RequestUtil {

	
public static AdapterMap<String, Object> getParameters(HttpServletRequest request) throws Exception{
	AdapterMap<String, Object> adapter = new AdapterMap<String, Object>();
	 	Map map  = request.getParameterMap();
	 	Set keyset = map.keySet();
	 	Iterator i = keyset.iterator();
	 	while(i.hasNext()){
			Object key 		= i.next();
			Object[] value  	= (Object[]) map.get(key);
			adapter.add((String)key, (value)[0] );
		}
	return adapter;
}
	
public static HashMap<String, String> getParametersFirst(HttpServletRequest request){
	HashMap<String, String> adapter = new HashMap<String, String>();
	Map map  = request.getParameterMap();
	Set keyset = map.keySet();
	Iterator i = keyset.iterator();
	while(i.hasNext()){
		Object key 		= i.next();
		String[] value  	= (String[]) map.get(key);
		adapter.put((String)key, (value)[0] );
	}
	return adapter;
}
public static HashMap<String, Object> getSessionAttr(HttpSession session){
	Enumeration<String> e = session.getAttributeNames();
	HashMap<String, Object> adapter = new HashMap<String, Object>();
	while(e.hasMoreElements()){
		String name = e.nextElement().toString();
		adapter.put(name, session.getAttribute(name));
	}
	return adapter;
}

	/*
	1. response.sendRedirect("/contextName/helloWorld.jsp");
	
	전송되는 페이지의 HTTP HEADER에 리다이렉트 정보를 담아 보낸다. 브라우저가 HEADER 정보를 분석한 후 원하는 URL로 리다이렉트 시킨다. sendRedirect 이후에 세션, 쿠키, 헤더 정보를 조작하는 로직이 있다면 Cannot create a session after the response has been committed 에러를 내뱉는다. 비지니스 로직에서 sendRedirect를 하게 된다면 과감하게 return 시키자. 경로에는 컨텍스트명을 포함한 절대 경로(/로 시작하거나 http로 시작하는 풀 주소)로 적어주어야 한다.
	
	2. request.getRequestDispatcher("/helloWorld.jsp").forward(request, response);
	
	해당 코드가 실행되는 순간 이동할 페이지를 강제로 읽어들여 리다이렉트 한다. 브라우저에게 의사 결정권이 없다.
	이후의 코드가 무시된다. sendRedirect와 같은 기능을 하지만 sendRedirect는 request/response를 잃는 반면 getRequestDispatcher의 경우 재활용 한다. 경로에는 컨텍스트명을 제외한 경로를 적는다.
	 */
/*
String nextJSP = "/searchResults.jsp";
RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(nextJSP);
dispatcher.forward(request,response);
	*/
	//jsp 이동
	public static void forward(HttpServletRequest request, HttpServletResponse response,String path) throws ServletException, IOException{
		 request.getRequestDispatcher(path).forward(request, response); 
	}
	public static void include(HttpServletRequest request, HttpServletResponse response,String path) throws ServletException, IOException{
//		out.flush();
		try{
		response.getWriter().flush();
		}catch (Exception e) {
		}
		request.getRequestDispatcher(path).include(request, response);
	}

	///test/Fluid/includeTest.jsp
	public static String getURI(HttpServletRequest request) throws ServletException, IOException{
		return request.getRequestURI();
	}
	//http://localhost:8080/test/Fluid/includeTest.jsp
	public static String getURL(HttpServletRequest request) throws ServletException, IOException{
		return request.getRequestURL().toString();
	}
   public static String getRemoteAddr(HttpServletRequest request) {
	   return request.getRemoteAddr();
   }
   public static int getServerPort(HttpServletRequest request) {
	   return request.getServerPort();
   }

	//전에 호출한 url
	public static String getHeaderReferer(HttpServletRequest request,String header){
		return getHeader(request,"Referer");
	}
	public static String getURIFULL(HttpServletRequest request){
		String uri = request.getScheme() + "://" +   // "http" + "://
	             request.getServerName() +       // "myhost"
	             ":" +                           // ":"
	             request.getServerPort() +       // "8080"
	             request.getRequestURI() +       // "/people"
	             "?" +                           // "?"
	             request.getQueryString();       // "lastname=Fox&age=30"
		return uri;
	}


	 /**
    * <p>지정된 요청 헤더값을 얻음.</p>
	 *
    * @param	요청 객체.
    * @param	값을 찾을 헤더값.
    * @return	지정한 헤더에 대한 값.response.setHeader
    */
   public static String getHeader(HttpServletRequest request, String header) {

       // underscore w/allCap
       String headerValue = request.getHeader(header);
       if (headerValue == null) {
           // underscore w/ title case
           header = headerToTitleCase(header.toLowerCase()); 
           headerValue = request.getHeader(header);
           if (headerValue == null) {           
               // dash w/ title case
               header = StringUtil.replaceAll(header,"_", "-"); 
               headerValue = request.getHeader(header);
               if (headerValue == null) {
                   // dash w/ all caps
                   header = header.toUpperCase(); 
                   headerValue = request.getHeader(header);
                   if (headerValue == null) {
                       // dash w/ all lower
                       header = header.toLowerCase(); 
                       headerValue = request.getHeader(header);
                       if (headerValue == null) {
                           // underscore w/ all lower
                           header = StringUtil.replaceAll(header,"-", "_"); 
                           headerValue = request.getHeader(header);
                       }
                   }
               }
           }
       }
       return headerValue;
   }


   /**
    * Special implemenation - just for request headers.  Capitalizes
    * the first letter of each word.  Depends on words being
    * separated with "_" or "-".  
    * doesn't properly check header name string indices.
    *
    * @param header The HTTP header string to capitalize the distinct
    * words of.
    * @return The modified value of the header.
    */
   public static String headerToTitleCase(String header) {

       int underscoreLoc = header.indexOf("_");
       if (underscoreLoc == -1) underscoreLoc = header.indexOf("-");
       String firstChar = header.substring(0, 1).toUpperCase();

       if (underscoreLoc != -1) {
           String secondChar =
               header.substring(underscoreLoc + 1, underscoreLoc + 2)
               .toUpperCase();
           header = firstChar + header.substring(1, underscoreLoc + 1) +
               secondChar + header.substring(underscoreLoc+2);
       }
       else {
           header = firstChar + header.substring(1);
       }
       return header;
   }

   public static String getRealPath(HttpServletRequest request,String fileName) {
	   return getRealPath(request.getSession().getServletContext(),fileName);
   }
   public static String getRealPath(ServletContext context,String fileName) {
	   return context.getRealPath(fileName);
   }
   
}
