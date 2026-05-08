from app.parser import parser


def test_split_into_sections_detects_heading_titles() -> None:
    raw_text = """
Summary
Experienced software engineer with a strong background in cloud applications.

Experience
Software Engineer at Example Corp

Education
B.S. in Computer Science
"""
    sections = parser.split_into_sections(raw_text)

    assert len(sections) == 3
    assert sections[0].title == "Summary"
    assert "Experienced software engineer" in sections[0].content
    assert sections[1].title == "Experience"
    assert "Software Engineer at Example Corp" in sections[1].content
    assert sections[2].title == "Education"
    assert "B.S. in Computer Science" in sections[2].content


def test_detect_section_header_alias_match() -> None:
    assert parser.detect_section_header("Professional Summary") == "Summary"
    assert parser.detect_section_header("Work Experience") == "Experience"
    assert parser.detect_section_header("Technical Skills") == "Skills"
    assert parser.detect_section_header("Academic Background") == "Education"
