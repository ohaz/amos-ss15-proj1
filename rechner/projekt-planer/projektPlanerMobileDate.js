define(function () {

  function CMobileDate() {

    this.m_iDay;;
    this.m_iMonth;
    this.m_iYear;

    //=============================================================================
    //@MFUNC   Gibt den ersten Tag eines Jahres zurueck
    //-----------------------------------------------------------------------------
    // int | Jahr | Fuer welches Jahr
    // 0 | Montag
    // 1 | Dienstag
    // 2 | Mittwoch
    // 3 | Donnerstag
    // 4 | Freitag
    // 5 | Samstag
    // 6 | Sonntag
    this.GetFirstDayOfWeekInYear = function (Year) {
      //1.Januar 2007 ist ein Montag
      var iYear = 2007;
      var iDays = 0;
      while (iYear != Year) {
        if (iYear < Year) {
          iDays += this.GetNrDaysInYear(iYear);
          iYear++;
        }
        else {
          iDays -= this.GetNrDaysInYear(iYear - 1);
          iYear--;
        }
      }
      if (iDays < 0) {
        iDays *= -1;
        iDays %= 7;
        if (iDays != 0)
          iDays = 7 - iDays;
      }
      return (iDays % 7);
    };

    //=============================================================================
    // Gibt die Anzahl der Tage in einem Jahr zurück
    this.GetNrDaysInYear = function (Year) {
      if (Year % 400 == 0)
        return 366;
      if (Year % 100 == 0)
        return 365;
      if (Year % 4 == 0)
        return 366;
      return 365;
      //Ist das Jahr durch 4 ganz teilbar, ist es ein Schaltjahr
      //Ist das Jahr durch 100 ganz teilbar, ist es kein Schaltjahr
      //Ist das Jahr durch 400 ganz teilbar, ist es ein Schaltjahr.
    };

    //=============================================================================
    // Gibt die Anzahl der Tage in einem Monat zurück
    this.GetNrDaysInMonth = function (Year, Month) {
      //Month = Month ? Month : this.m_iMonth;
      //Year = Year ? Year : this.m_iYear;

      if (Month > 12 || Month < 1)
        return -1;

      switch (Month) {
      case 2:
        if (this.GetNrDaysInYear(Year) == 366)
          return 29;
        else
          return 28;
      case 4:
        return 30;
      case 6:
        return 30;
      case 9:
        return 30;
      case 11:
        return 30;
      default:
        return 31;
      }
    };

    /*this.GetNrDaysInMonth = function()
        {
            return this.GetNrDaysInMonth(this.m_iYear,this.m_iMonth);
        };

        this.GetNrDaysInMonth = function(Month)
        {
            return GetNrDaysInMonth(this.m_iYear,Month);
        };*/

    //=============================================================================
    // Gibt zurück auf welchen Wochentag das Datum fällt
    this.GetDayOfWeek = function (Day, Month, Year) {
      if (Day == 0 && Month == 0 && Year == 0)
        return ((this.GetNr() + this.GetFirstDayOfWeekInYear(this.m_iYear) - 1) % 7);
      else {
        var TempDateHere = new CMobileDate();
        TempDateHere.SetDate(Day, Month, Year);
        var tempNrHere = TempDateHere.GetNr();
        var tempYeHere = TempDateHere.GetFirstDayOfWeekInYear(Year);
        return ((tempNrHere + tempYeHere - 1) % 7);
      }
    };

    /*this.GetDayOfWeek = function()
        {
            return ((this.GetNr() + this.GetFirstDayOfWeekInYear(this.m_iYear) - 1)%7);
        };*/

    //=============================================================================
    // Gibt zurück der wievielte Tag im Jahr das Datum ist
    this.GetNr = function () {
      var iDays = this.m_iDay;
      for (var iMonth = 1; iMonth < this.m_iMonth; iMonth++) {
        iDays += this.GetNrDaysInMonth(this.m_iYear, iMonth);
      }
      return iDays;
    };

    //=============================================================================
    // Setzt das Datum auf den X-Tag im Jahr
    this.SetNr = function (Nr, Year) {
      if (!this.SetYear(Year))
        return false;
      //return SetNr(Nr);
      var iMonth = 1;
      while (Nr > this.GetNrDaysInMonth(this.m_iYear, iMonth)) {
        Nr -= this.GetNrDaysInMonth(this.m_iYear, iMonth);
        iMonth++;
      }
      return this.SetDate(Nr, iMonth, this.m_iYear);
    };

    /*this.SetNr = function(Nr)
        {
            int iMonth = 1;
            while(Nr > GetNrDaysInMonth(this.m_iYear, iMonth)){
                Nr -= GetNrDaysInMonth(this.m_iYear, iMonth);
                iMonth++;
            }
            return SetDate(Nr,iMonth);
        }*/

    //=============================================================================
    // Gibt den gespeicherten Tag zurück
    this.GetDay = function () {
      return this.m_iDay;
    };

    //=============================================================================
    // Setzt nur den Tag
    this.SetDay = function (Day) {
      if (Day < 1 || this.GetNrDaysInMonth(this.m_iYear, this.m_iMonth) < Day)
        return false;
      this.m_iDay = Day;
      return true;
    };

    //=============================================================================
    // Setzt nur den Monat
    this.SetMonth = function (Month) {
      if (Month > 12 || Month < 1)
        return false;
      this.m_iMonth = Month;
      return true;
    };

    //=============================================================================
    //@MFUNC   Setzt nur das Jahr
    this.SetYear = function (Year) {
      this.m_iYear = Year;
      return true;
    };

    //=============================================================================
    // Setzt das komplette Datum
    this.SetDate = function (Day, Month, Year) {
      var iOldYear = this.m_iYear;
      var iOldMonth = this.m_iMonth;
      this.m_iYear = Year;

      if (this.SetMonth(Month) && this.SetDay(Day))
        return true;
      else {
        this.m_iYear = iOldYear;
        this.m_iMonth = iOldMonth;
        return false;
      }
    };

    /*bool CMobileDate::SetDate(int Day, int Month){
            int iOldMonth = this.m_iMonth;
            if(!SetMonth(Month))
                return false;
            if(!SetDay(Day)){
                SetMonth(iOldMonth);
                return false;
            }
            return true;
        }*/

    //=============================================================================
    // Gibt den gespeicherten Monat zurück
    this.GetMonth = function () {
      return this.m_iMonth;
    };

    //=============================================================================
    // Gibt das gespeicherte Jahr zurück
    this.GetYear = function () {
      return this.m_iYear;
    };

    //=============================================================================
    // Gibt das komplette Datum zurück
    /*this.GetDate = function(Day, Month, Year)
        {
            if(Day != NULL)*Day = this.m_iDay;
            if(Month != NULL)*Month = this.m_iMonth;
            if(Year != NULL)*Year = this.m_iYear;
            return true;
        }*/

    //=============================================================================
    //@MFUNC   Gibt das Datum formartiert in einem String zurück
    //-----------------------------------------------------------------------------
    //@PARM    PDACHAR | *pBufferString | Pointer auf einen String, der das
    // formatierte Datum enthält
    //@PARM    int | BufferSize | Länge des Puffers
    //@PARM    int | FormatID | Gibt an wie das Datum formatiert werden soll
    //@flag    1 | System Short Date
    //@flag    2 | System Long Date
    //@flag    3 | DATEV Short Date
    //@RDESC   bool
    //@flag    true | Kein Fehler
    //@flag    false | Fehler
    //@XREF    <c CMobileDate>
    //@END
    // Autor: Schnuck Christoph, DATEV eG / E661
    //-----------------------------------------------------------------------------
    /*bool CMobileDate::GetFormatedString(PDACHAR *pBufferString, int BufferSize, int FormatID) const
        {
            if( FormatID != 3 ) {
        #ifdef _WIN32_WCE
            SYSTEMTIME stInObject;
            stInObject.wDay = GetDay();
            stInObject.wMonth = GetMonth();
            stInObject.wYear = GetYear();
            stInObject.wDayOfWeek = GetDayOfWeek()+1;
            if(stInObject.wDayOfWeek == 7) stInObject.wDayOfWeek = 0;

            stInObject.wHour = 0;
            stInObject.wMinute = 0;
            stInObject.wSecond = 0;
            stInObject.wMilliseconds = 0;

            GetDateFormat(LOCALE_USER_DEFAULT, FormatID == 2 ? DATE_LONGDATE : DATE_SHORTDATE,&stInObject,
                NULL,pBufferString,BufferSize);

            //kurzes Systemdatum?
            if( FormatID == 1)
            {
                int iLengthDatum = _tcsclen(pBufferString);
                //String nicht ganz leer?
                if(iLengthDatum > 4)
                {
                    //d.m.YYYY nicht erlaubt
                    //Falls die letzten vier Buchstaben allesamt Zahlen sind, liegt d.m.YYYY vor
                    if(    pBufferString[iLengthDatum-1] >= '0' && pBufferString[iLengthDatum-1] <= '9' &&
                        pBufferString[iLengthDatum-2] >= '0' && pBufferString[iLengthDatum-2] <= '9' &&
                        pBufferString[iLengthDatum-3] >= '0' && pBufferString[iLengthDatum-3] <= '9' &&
                        pBufferString[iLengthDatum-4] >= '0' && pBufferString[iLengthDatum-4] <= '9'
                        )
                    {
                        //wird in d.m.YY umgewandelt
                        for(int i = 2; i >= 0; i--)
                            pBufferString[iLengthDatum-i-2] =
                            pBufferString[iLengthDatum-i];
                    }
                    //YYYY-MM-dd nicht erlaubt
                    //Falls die ersten vier Buchstaben allesamt Zahlen sind, liegt YYYY-MM-dd vor
                    if( pBufferString[0] >= '0' && pBufferString[0] <= '9' &&
                        pBufferString[1] >= '0' && pBufferString[1] <= '9' &&
                        pBufferString[2] >= '0' && pBufferString[2] <= '9' &&
                        pBufferString[3] >= '0' && pBufferString[3] <= '9'
                        )
                    {
                        //wird in YY-MM-dd umgewandelt
                        _tcscpy(pBufferString,&(pBufferString[2]));
                    }
                }
            }

        #else
            DateToAscii(GetMonth(),GetDay(),GetYear(),
                PrefGetPreference(FormatID == 2 ? prefLongDateFormat : prefDateFormat),
                pBufferString);
        #endif
            }else{
                PDAsnprintf(
                    pBufferString,
                    BufferSize,
                    PDAT("%.2d.%.2d.%.4d"),
                    GetDay(),GetMonth(),GetYear());
            }
            return true;
        }*/

    /*bool CMobileDate::operator ==( const CMobileDate& date ) const
        {
            return (date.GetDay() == this->GetDay()
                && date.GetMonth() == this->GetMonth()
                && date.GetYear() == GetYear());
        }

        bool CMobileDate::operator !=( const CMobileDate& date ) const
        {
            return !this->operator==(date);
        }

        bool CMobileDate::operator <( const CMobileDate& date ) const
        {
            if(this->GetYear() < date.GetYear())
                return true;
            if(this->GetNr() < date.GetNr())
                return true;
            return false;
        }

        bool CMobileDate::operator >( const CMobileDate& date ) const
        {
            if(this->GetYear() > date.GetYear())
                return true;
            else if (this->GetYear() < date.GetYear())
                return false;
            if(this->GetNr() > date.GetNr())
                return true;
            return false;
        }

        bool CMobileDate::operator <=( const CMobileDate& date ) const
        {
            return(this->operator==(date) || this->operator<(date));
        }

        bool CMobileDate::operator >=( const CMobileDate& date ) const
        {
            return(this->operator==(date) || this->operator>(date));
        }

        CMobileDate& CMobileDate::operator +( const CMobileDate& date )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()-date.GetNrDaysSinceJesus());
            return *this;
        }

        CMobileDate& CMobileDate::operator -( const CMobileDate& date )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()-date.GetNrDaysSinceJesus());
            return *this;
        }

        CMobileDate& CMobileDate::operator +( const int Days )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()+Days);
            return *this;
        }

        CMobileDate& CMobileDate::operator -( const int Days )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()-Days);
            return *this;
        }

        CMobileDate& CMobileDate::operator++ ( void )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()+1);
            return *this;
        }

        CMobileDate& CMobileDate::operator-- ( void )
        {
            SetNrDaysSinceJesus(GetNrDaysSinceJesus()-1);
            return *this;
        }*/

    /*bool CMobileDate::SetNrDaysSinceJesus(int Days)
        {
            int plusorminus = 1;
            if(Days < 0){
                plusorminus = -1;
                Days *= plusorminus;
            }
            int Year = 0;
            while(Days > 0){
                if(GetNrDaysInYear(Year) > Days){
                    if(plusorminus == 1)
                        SetNr(Days,Year);
                    else
                        SetNr(GetNrDaysInYear(Year)-Days,Year);
                }
                else
                {
                    Days -= GetNrDaysInYear(Year);
                    Year += plusorminus;
                }
            }
            return true;
        }

        int CMobileDate::GetNrDaysSinceJesus() const
        {
            int plusorminus = 1;
            if(GetYear() < 0)
                plusorminus = -1;
            int Year = 0;
            int Days = 0;
            while(Year != GetYear()){
                Days += plusorminus * GetNrDaysInYear(Year);
                Year += plusorminus;
            }
            if(plusorminus == 1)
                Days += GetNr();
            else
                Days += GetNrDaysInYear(Year) - GetNr();
            return Days;
        }*/
  }

  return CMobileDate;

});
