package khh.web.jsp.framework.fluid;

import khh.std.adapter.AdapterMap;


public class Template {

	private String nodeid;
	private String value							= null;
	private String extends_							= null;
	private AdapterMap<String,View> viewlist		= new AdapterMap<String,View>();
//	private LogK log = LogK.getInstance();
	public String getNodeid() {
		return nodeid;
	}
	public void setNodeid(String nodeid) {
		this.nodeid = nodeid;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

	public String getExtends() {
		return extends_;
	}
	public void setExtends(String extends_) {
		this.extends_ = extends_;
	}
	public void addView(String id,View view) throws Exception{
		viewlist.add(id,view);
	}
	public View getView(String id) throws Exception{
		return viewlist.get(id);
	}
	public AdapterMap<String, View> getViewlist() {
		return viewlist;
	}
	public void setViewlist(AdapterMap<String, View> viewlist) {
		this.viewlist = viewlist;
	}
	public String getViewValue(String id) throws Exception{
		return viewlist.get(id).getValue();
	}

}
