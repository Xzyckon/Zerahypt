#pragma strict
import System.IO;
import System.Xml;

public static function SaveDataXml(path : String, xml_doc : XmlDocument) : boolean {
	try {
		var _path : String = GetGlobalPath(path);
		var _dirPath : String = _path.Substring(0, _path.LastIndexOf("/"));
		if (!Directory.Exists(_dirPath))
			Directory.CreateDirectory(_dirPath);
		
	    var settings : XmlWriterSettings = new XmlWriterSettings();
	    settings.Indent = true;
	    settings.CloseOutput = true;

	    var writer : XmlWriter = XmlWriter.Create(_path, settings);
	    xml_doc.Save(writer);
	    writer.Flush();
	    writer.Close();
	    
	    var exit_writer : System.IDisposable = writer;
	    exit_writer.Dispose();
		return true;
	} catch (err : System.Exception) {
		Debug.LogError(String.Format("Couldnt save data to {0}! contact magii for help", _path));
		return false;
	}
}

public static function SaveData(path : String, data : String) : boolean {
	try {
		var _path : String = GetGlobalPath(path);
		var _dirPath : String = _path.Substring(0, _path.LastIndexOf("/"));
		if (!Directory.Exists(_dirPath))
			Directory.CreateDirectory(_dirPath);
			
		File.WriteAllText(_path, data);
		return true;
	} catch (err : System.Exception) {
		Debug.LogError(String.Format("Couldnt save data to {0}! contact magii for help", _path));
		return false;
	}
}

public static function LoadData(path : String) : String {
	try {
		var _path : String = GetGlobalPath(path);
		if(File.Exists(_path)) {
			return File.ReadAllText(_path);
		}
	} catch (err : System.Exception) {
		Debug.LogError(String.Format("Couldnt load data at {0}! contact magii for help", _path));
		throw(err);
	}
	return "";
}

public static function HasData(path : String) {
	var _path : String = GetGlobalPath(path);
	if (System.IO.File.Exists(_path))
		return true;
	return false;
}

public static function GetGlobalPath(path : String) : String {
	var _path : String = GetAppData() + "/Zerahypt/Save";
	var _pathParts : String[] = path.Split("/"[0]);
	
	var i : int;
	for(i = 0; i < _pathParts.Length; i++) {
		_path += "/" + _pathParts[i];
	}
	return _path + ".dat";
}

public static function Encrypt(data : String) : String {
	var newString : String;
	var maxValue : int = char.MaxValue;

	var i : int;
	for(i = 0; i < data.Length; i++) {
		var _char : int = data[i];
		var _newChar : char = (_char + 1 - maxValue / 255);
		newString += _newChar;
	}
	return newString;
	//return DataToBytes(newString);
}

public static function Decrypt(data : String) : String {
	//data = BytesToData(data);
	var newString : String;
	var maxValue : int = char.MaxValue;

	var i : int;
	for(i = 0; i < data.Length; i++) {
		var _char : int = data[i];
		var _newChar : char = (_char - 1 + maxValue / 255);
		newString += _newChar;
	}
	return newString;
}

private static function DataToBytes (data : String) : String {
	var _data : String;
	
	var i : int;
	for(i = 0; i < data.Length; i++) {
		var _byte : int = data[i];
		_data += _byte + "_";
	}
	return _data;
}

private static function BytesToData (bytes : String) : String {
	var _data : String[] = bytes.Split("_"[0]);
	var _returnData : String;
	
	var i : int;
	for(i = 0; i < _data.Length-1; i++) {
		var _byte : char = int.Parse(_data[i]);
		_returnData += _byte;
	}
	return _returnData;
}

public static function GetAppData() : String {
	return System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData);
}