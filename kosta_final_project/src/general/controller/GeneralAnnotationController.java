package general.controller;

import general.model.GeneralDAO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GeneralAnnotationController {
	private GeneralDAO generalDao;

	public void setGeneralDao(GeneralDAO generalDao) {
		this.generalDao = generalDao;
	}
	
	@RequestMapping("/test_main.do")
	public  ModelAndView test_page()throws Exception{
		System.out.println("오냐");
		//return new ModelAndView("redirect:/message/test_list.jsp");
		/*
		 * 위와 같이 만약 message/test_list.jsp 라고 적었다면
		 * 이건 WEB-INF/message/message-servlet.xml에서 나타낸 핸들러나 컨트롤러의 설정에 
		 * 따라서 경로를 찾아간다..!!!! 참고할것!
		 */
		return new ModelAndView("redirect:/test_list.jsp");
	}

}
